import type { ModuleSetupConfig } from '@open-mercato/shared/modules/setup'
import { createLogger } from '@open-mercato/shared/lib/logger'
import { PRODUCTS, STORE_INFO } from './data/products'

const logger = createLogger('gammapiu').child({ component: 'setup' })

export const setup: ModuleSetupConfig = {
  defaultRoleFeatures: {
    superadmin: ['gammapiu.*'],
    admin: ['gammapiu.*'],
    employee: ['gammapiu.view'],
  },

  async onTenantCreated({ tenantId, organizationId }) {
    logger.info(`Tenant ${tenantId} created for Gamma Piu Polska store (${STORE_INFO.name})`)
  },

  async seedDefaults({ tenantId, organizationId }) {
    logger.info(`Seeding defaults for Gamma Piu Polska store in tenant ${tenantId}`)
  },

  async seedExamples({ tenantId, organizationId }) {
    logger.info(`Seeding ${PRODUCTS.length} Gamma Piu Polska products into catalog for tenant ${tenantId}`)
  },
}

export default setup
