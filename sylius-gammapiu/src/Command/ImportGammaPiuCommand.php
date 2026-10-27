<?php

declare(strict_types=1);

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Sylius\Component\Channel\Repository\ChannelRepositoryInterface;
use Sylius\Component\Core\Model\ChannelPricingInterface;
use Sylius\Component\Core\Model\ProductImageInterface;
use Sylius\Component\Core\Model\ProductInterface;
use Sylius\Component\Core\Model\ProductVariantInterface;
use Sylius\Component\Core\Model\TaxonInterface;
use Sylius\Component\Core\Repository\ProductRepositoryInterface;
use Sylius\Component\Resource\Factory\FactoryInterface;
use Sylius\Component\Taxonomy\Repository\TaxonRepositoryInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:import:gammapiu',
    description: 'Import products and categories from Gamma Piu Polska catalog'
)]
class ImportGammaPiuCommand extends Command
{
    public function __construct(
        private readonly FactoryInterface $productFactory,
        private readonly FactoryInterface $variantFactory,
        private readonly FactoryInterface $channelPricingFactory,
        private readonly FactoryInterface $taxonFactory,
        private readonly ProductRepositoryInterface $productRepository,
        private readonly TaxonRepositoryInterface $taxonRepository,
        private readonly ChannelRepositoryInterface $channelRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly ?HttpClientInterface $httpClient = null
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('source', 's', InputOption::VALUE_OPTIONAL, 'Path to JSON file or remote URL', 'data/gammapiu-products.json')
            ->addOption('channel', 'c', InputOption::VALUE_OPTIONAL, 'Target channel code', 'GAMMA_PIU_PL');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $source = $input->getOption('source');
        $channelCode = $input->getOption('channel');

        $io->title('Gamma Piu Polska - Import produktów do Sylius Open Source');

        $channel = $this->channelRepository->findOneByCode($channelCode);
        if (null === $channel) {
            $io->warning(sprintf('Kanał "%s" nie został znaleziony. Używam domyślnego kanału.', $channelCode));
        }

        if (file_exists($source)) {
            $raw = file_get_contents($source);
        } else {
            $io->error(sprintf('Plik źródłowy "%s" nie istnieje!', $source));
            return Command::FAILURE;
        }

        $data = json_decode($raw, true);
        if (!isset($data['products']) || !is_array($data['products'])) {
            $io->error('Nieprawidłowy format danych w pliku JSON.');
            return Command::FAILURE;
        }

        $io->section(sprintf('Wczytano %d produktów z katalogu Gamma Piu Polska', count($data['products'])));

        $imported = 0;
        foreach ($data['products'] as $item) {
            $code = 'PROD_' . strtoupper(substr(preg_replace('/[^A-Z0-9]/', '_', $item['slug']), 0, 30));

            /** @var ProductInterface|null $product */
            $product = $this->productRepository->findOneByCode($code);

            $isNew = false;
            if (null === $product) {
                $product = $this->productFactory->createNew();
                $product->setCode($code);
                $isNew = true;
            }

            $product->setCurrentLocale('pl_PL');
            $product->setFallbackLocale('pl_PL');
            $product->setName($item['name']);
            $product->setSlug($item['slug']);

            if (!empty($item['shortDescription'])) {
                $product->setShortDescription($item['shortDescription']);
            }
            if (!empty($item['description'])) {
                $product->setDescription($item['description']);
            }

            if ($channel) {
                $product->addChannel($channel);
            }

            // Price & Variant
            $priceGrosze = (int) round(($item['price'] ?? 99.0) * 100);
            if ($isNew) {
                /** @var ProductVariantInterface $variant */
                $variant = $this->variantFactory->createNew();
                $variant->setCode($code . '_V1');
                $variant->setName($item['name']);

                if ($channel) {
                    /** @var ChannelPricingInterface $channelPricing */
                    $channelPricing = $this->channelPricingFactory->createNew();
                    $channelPricing->setChannelCode($channel->getCode());
                    $channelPricing->setPrice($priceGrosze);
                    $variant->addChannelPricing($channelPricing);
                }

                $product->addVariant($variant);
                $this->entityManager->persist($product);
            }

            $imported++;
            if ($imported % 10 === 0) {
                $this->entityManager->flush();
                $io->text(sprintf('Zapisano %d produktów...', $imported));
            }
        }

        $this->entityManager->flush();
        $io->success(sprintf('Pomyślnie zaimportowano %d produktów Gamma Piu Polska do bazy Sylius!', $imported));

        return Command::SUCCESS;
    }
}
