"use client"

import React, { useState, useMemo } from 'react'
import { PRODUCTS, CATEGORIES, STORE_INFO, type GammaPiuProduct } from '../../data/products'

interface CartItem {
  product: GammaPiuProduct
  quantity: number
}

export default function GammaPiuStorefrontPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('wszystkie')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [activeProduct, setActiveProduct] = useState<GammaPiuProduct | null>(null)
  const [shippingMethod, setShippingMethod] = useState<'inpost' | 'courier' | 'pickup'>('inpost')
  const [paymentMethod, setPaymentMethod] = useState<'p24' | 'payu' | 'cod'>('p24')
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false)

  // Filtering products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'wszystkie' || item.category === selectedCategory
      const matchBrand =
        selectedBrand === 'all' ||
        (selectedBrand === 'gammapiu' && item.brand.toLowerCase().includes('gamma')) ||
        (selectedBrand === 'stylecraft' && item.brand.toLowerCase().includes('stylecraft'))
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchBrand && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [selectedCategory, selectedBrand, searchQuery, sortBy])

  // Cart operations
  const addToCart = (product: GammaPiuProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.product.id === product.id)
      if (existing) {
        return prev.map((ci) =>
          ci.product.id === product.id ? { ...ci, quantity: ci.quantity + qty } : ci
        )
      }
      return [...prev, { product, quantity: qty }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.product.id === productId) {
            const newQ = ci.quantity + delta
            return newQ > 0 ? { ...ci, quantity: newQ } : null
          }
          return ci
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((ci) => ci.product.id !== productId))
  }

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const shippingCost = useMemo(() => {
    if (cartSubtotal >= STORE_INFO.freeShippingThreshold) return 0
    if (shippingMethod === 'pickup') return 0
    if (shippingMethod === 'inpost') return 14.99
    if (shippingMethod === 'courier') return 18.99
    return 0
  }, [cartSubtotal, shippingMethod])

  const grandTotal = cartSubtotal + shippingCost

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top bar announcement */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="bg-amber-600 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Oficjalny Sklep
            </span>
            <span>Darmowa dostawa od 250 zł | Wysyłka w 24h z magazynu w Wejherowie</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Infolinia: <strong className="text-stone-200">{STORE_INFO.phone}</strong></span>
            <span>Serwis: <strong className="text-stone-200">{STORE_INFO.servicePhone}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="cursor-pointer" onClick={() => setSelectedCategory('wszystkie')}>
              <div className="text-2xl font-black tracking-tighter uppercase text-stone-900">
                GAMMA PIÙ <span className="text-amber-600">POLSKA</span>
              </div>
              <div className="text-[10px] tracking-widest text-stone-500 uppercase font-medium">
                & StyleCraft Professional Tools
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Szukaj suszarek, maszynek, ostrzy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 border border-stone-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action: Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-stone-900 hover:bg-amber-600 text-white px-4 py-2.5 rounded-full text-sm font-medium transition shadow-sm"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Koszyk</span>
              <span className="bg-amber-500 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-stone-100 bg-stone-50 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-xs font-medium whitespace-nowrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full transition ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Premiera 2026: StyleCraft REIGN & XCell S
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Najwyższa Precyzja. <br />
              <span className="text-amber-400">Bezkompromisowa Moc.</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mb-6 max-w-xl">
              Oficjalna polska dystrybucja włoskich suszarek Gamma Più oraz amerykańskich maszynek i trymerów StyleCraft. 
              Gwarancja fabryczna, autoryzowany serwis i natychmiastowa wysyłka z Pomorza.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('maszynki')}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-sm transition"
              >
                Zobacz Maszynki
              </button>
              <button
                onClick={() => setSelectedCategory('suszarki')}
                className="bg-stone-800 hover:bg-stone-700 text-white border border-stone-600 font-bold px-6 py-3 rounded-xl text-sm transition"
              >
                Suszarki Cyfrowe
              </button>
            </div>
          </div>
          <div className="bg-stone-800/60 p-6 rounded-2xl border border-stone-700 backdrop-blur">
            <h3 className="text-lg font-bold mb-3 text-amber-300">Dlaczego Gamma Più Polska?</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>100% Oryginalny sprzęt</strong> bezpośrednio od producenta</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Autoryzowany serwis w Wejherowie</strong> (ul. Budowlanych 4)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Darmowa wysyłka</strong> Paczkomatem lub Kurierem od 250 zł</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Gwarancja 24 miesiące</strong> (konsumenci) i 12 miesięcy (salony B2B)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls: Brand filter + Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Marka:</span>
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedBrand === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              Wszystkie ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedBrand('gammapiu')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedBrand === 'gammapiu'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              Gamma Più
            </button>
            <button
              onClick={() => setSelectedBrand('stylecraft')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedBrand === 'stylecraft'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              StyleCraft
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Sortuj według:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="default">Domyślnie</option>
              <option value="price-asc">Cena: od najniższej</option>
              <option value="price-desc">Cena: od najwyższej</option>
              <option value="name">Nazwa A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group"
            >
              {/* Product Image */}
              <div
                className="relative bg-stone-100 h-64 p-4 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => setActiveProduct(product)}
              >
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase z-10">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-56 max-w-full object-contain group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-amber-700 mb-1">
                    {product.brand}
                  </div>
                  <h3
                    onClick={() => setActiveProduct(product)}
                    className="font-bold text-stone-900 hover:text-amber-600 cursor-pointer text-sm mb-1 line-clamp-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-lg font-black text-stone-950">
                        {product.price.toLocaleString('pl-PL')},00 PLN
                      </div>
                      <div className="text-[10px] text-stone-400">zawiera 23% VAT</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveProduct(product)}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 rounded-xl transition text-center"
                    >
                      Szczegóły
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-xl transition text-center"
                    >
                      Do koszyka
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">Brak produktów</h3>
            <p className="text-xs text-stone-500 mb-4">
              Nie znaleziono produktów odpowiadających wybranym filtrom.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('wszystkie')
                setSelectedBrand('all')
                setSearchQuery('')
              }}
              className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-600 transition"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="bg-stone-100 rounded-2xl p-4 flex items-center justify-center">
                <img
                  src={activeProduct.images[0]}
                  alt={activeProduct.name}
                  className="max-h-72 object-contain"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  {activeProduct.brand}
                </span>
                <h2 className="text-xl font-black text-stone-900 mt-1 mb-2">
                  {activeProduct.name}
                </h2>
                <div className="text-2xl font-black text-stone-950 mb-4">
                  {activeProduct.price.toLocaleString('pl-PL')},00 PLN
                  <span className="text-xs font-normal text-stone-500 ml-2">brutto</span>
                </div>

                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {activeProduct.description}
                </p>

                {activeProduct.specs && (
                  <div className="mb-4 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <h4 className="text-xs font-bold uppercase text-stone-500 mb-2">Specyfikacja:</h4>
                    <div className="space-y-1 text-xs">
                      {Object.entries(activeProduct.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-stone-200/50 pb-1">
                          <span className="text-stone-500">{k}:</span>
                          <span className="font-semibold text-stone-900 text-right">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    addToCart(activeProduct)
                    setActiveProduct(null)
                  }}
                  className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition"
                >
                  Dodaj do koszyka ({activeProduct.price.toLocaleString('pl-PL')},00 PLN)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer / Slide-Over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛒</span>
                  <h2 className="text-lg font-black text-stone-900 uppercase tracking-tight">Twój Koszyk</h2>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                    {totalItemsCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Free shipping bar */}
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
                {cartSubtotal >= STORE_INFO.freeShippingThreshold ? (
                  <div className="text-emerald-700 font-bold flex items-center gap-1">
                    <span>🎉</span> Gratulacje! Masz darmową dostawę!
                  </div>
                ) : (
                  <div>
                    <span className="text-stone-700">
                      Do darmowej dostawy brakuje:{' '}
                      <strong className="text-amber-800">
                        {(STORE_INFO.freeShippingThreshold - cartSubtotal).toFixed(2)} PLN
                      </strong>
                    </span>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (cartSubtotal / STORE_INFO.freeShippingThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <div className="text-4xl mb-2">🛍️</div>
                  <p className="text-sm">Twój koszyk jest pusty.</p>
                  <p className="text-xs text-stone-400 mt-1">Dodaj profesjonalne urządzenia fryzjerskie.</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 object-contain bg-white rounded-lg p-1 border border-stone-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                        <div className="text-xs font-black text-amber-700">
                          {item.product.price.toLocaleString('pl-PL')},00 PLN
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="text-stone-500 hover:text-stone-900 font-bold px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="text-stone-500 hover:text-stone-900 font-bold px-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-600 text-xs ml-1"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Shipping Method Selector */}
              {cart.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase text-stone-600 mb-2">Sposób dostawy:</h4>
                  <div className="space-y-1.5 text-xs">
                    <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${shippingMethod === 'inpost' ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'inpost'}
                          onChange={() => setShippingMethod('inpost')}
                          className="text-amber-600"
                        />
                        <span>📦 Paczkomaty InPost 24/7</span>
                      </div>
                      <span className="font-bold">
                        {cartSubtotal >= STORE_INFO.freeShippingThreshold ? '0,00 PLN' : '14,99 PLN'}
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${shippingMethod === 'courier' ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'courier'}
                          onChange={() => setShippingMethod('courier')}
                          className="text-amber-600"
                        />
                        <span>🚚 Kurier DPD / InPost</span>
                      </div>
                      <span className="font-bold">
                        {cartSubtotal >= STORE_INFO.freeShippingThreshold ? '0,00 PLN' : '18,99 PLN'}
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${shippingMethod === 'pickup' ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'pickup'}
                          onChange={() => setShippingMethod('pickup')}
                          className="text-amber-600"
                        />
                        <span>🏢 Odbiór osobisty (Wejherowo)</span>
                      </div>
                      <span className="font-bold text-emerald-600">0,00 PLN</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              {cart.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase text-stone-600 mb-2">Metoda płatności:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('p24')}
                      className={`p-2 rounded-xl border text-center font-semibold ${paymentMethod === 'p24' ? 'border-amber-600 bg-amber-50 text-stone-900' : 'border-stone-200 text-stone-600'}`}
                    >
                      Przelewy24 / BLIK
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('payu')}
                      className={`p-2 rounded-xl border text-center font-semibold ${paymentMethod === 'payu' ? 'border-amber-600 bg-amber-50 text-stone-900' : 'border-stone-200 text-stone-600'}`}
                    >
                      PayU / Karta
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2 rounded-xl border text-center font-semibold ${paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50 text-stone-900' : 'border-stone-200 text-stone-600'}`}
                    >
                      Za pobraniem
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Checkout Section */}
            {cart.length > 0 && (
              <div className="border-t border-stone-200 pt-4">
                <div className="space-y-1.5 text-xs text-stone-600 mb-3">
                  <div className="flex justify-between">
                    <span>Produkty:</span>
                    <span>{cartSubtotal.toLocaleString('pl-PL')},00 PLN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dostawa:</span>
                    <span>{shippingCost === 0 ? 'Darmowa' : `${shippingCost.toFixed(2)} PLN`}</span>
                  </div>
                  <div className="flex justify-between font-black text-base text-stone-950 pt-2 border-t border-stone-200">
                    <span>Razem z VAT:</span>
                    <span>{grandTotal.toFixed(2)} PLN</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOrderPlaced(true)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black py-3 rounded-xl text-sm transition uppercase tracking-wider shadow-md"
                >
                  Złóż zamówienie ({grandTotal.toFixed(2)} PLN)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-black text-stone-900 mb-2">Dziękujemy za zamówienie!</h3>
            <p className="text-xs text-stone-600 mb-4">
              Twoje zamówienie zostało przyjęte do realizacji. Potwierdzenie wysłano na Twój adres e-mail.
              Paczka zostanie nadana w ciągu 24h z magazynu w Wejherowie.
            </p>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-left mb-4">
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Numer zamówienia:</span>
                <span className="font-mono font-bold">#GP-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Kwota do zapłaty:</span>
                <span className="font-bold text-amber-700">{grandTotal.toFixed(2)} PLN</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Dostawa:</span>
                <span className="font-semibold">{shippingMethod === 'inpost' ? 'Paczkomaty InPost' : shippingMethod === 'courier' ? 'Kurier DPD' : 'Odbiór osobisty'}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setCart([])
                setIsCartOpen(false)
                setIsOrderPlaced(false)
              }}
              className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Wróć do sklepu
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 mt-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div>
            <div className="text-xl font-black text-white uppercase tracking-tight mb-2">
              GAMMA PIÙ <span className="text-amber-500">POLSKA</span>
            </div>
            <p className="leading-relaxed mb-3">
              Oficjalny dystrybutor profesjonalnych urządzeń fryzjerskich i barberskich marek Gamma Più oraz StyleCraft w Polsce.
            </p>
            <div className="text-stone-500">
              © {new Date().getFullYear()} Gamma Piu Polska. Wszelkie prawa zastrzeżone.
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">Siedziba i Magazyn</h4>
            <p className="leading-relaxed">
              Gamma Piu Polska<br />
              ul. Budowlanych 4, Hala C<br />
              84-200 Wejherowo, Polska
            </p>
            <p className="mt-2 text-stone-300">
              NIP: 5882494514<br />
              REGON: 524642750
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">Kontakt i Serwis</h4>
            <ul className="space-y-1.5">
              <li>Biuro: <a href="tel:533819893" className="text-white hover:text-amber-400">533 819 893</a></li>
              <li>Serwis fabryczny: <a href="tel:533936703" className="text-white hover:text-amber-400">533 936 703</a></li>
              <li>E-mail: <a href="mailto:biuro@gammapiu-polska.pl" className="text-white hover:text-amber-400">biuro@gammapiu-polska.pl</a></li>
              <li>Serwis: <a href="mailto:serwis@gammapiu-polska.pl" className="text-white hover:text-amber-400">serwis@gammapiu-polska.pl</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">Architektura Sklepu</h4>
            <p className="leading-relaxed mb-2">
              Projekt przygotowany w dwóch wariantach architektury e-commerce:
            </p>
            <ul className="space-y-1 text-stone-300">
              <li>• <strong>Sylius Open Source</strong> (PHP 8.3 / Symfony / Docker / MySQL)</li>
              <li>• <strong>Open Mercato</strong> (Next.js / TypeScript / Monorepo)</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
