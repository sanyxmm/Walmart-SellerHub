/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} category
 * @property {number} inventory
 * @property {string} sku
 * @property {string[]} images
 * @property {'active' | 'inactive' | 'pending'} status
 * @property {Date} createdAt
 * @property {number} sales
 * @property {number} rating
 * @property {number} reviews
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} amount
 * @property {'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status
 * @property {string} customerName
 * @property {string} shippingAddress
 * @property {Date} orderDate
 * @property {Date} [deliveryDate]
 * @property {string} darkStore
 * @property {string} deliveryTime
 * @property {number} shippingRate
 */

/**
 * @typedef {Object} DarkStore
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {[number, number]} coordinates
 * @property {number} capacity
 * @property {number} currentStock
 * @property {number} deliveryRadius
 * @property {string} avgDeliveryTime
 */

/**
 * @typedef {Object} Analytics
 * @property {{ total: number, growth: number, monthly: Array<{ month: string, revenue: number }> }} revenue
 * @property {{ total: number, growth: number, pending: number, shipped: number, delivered: number }} orders
 * @property {{ total: number, active: number, outOfStock: number, topSelling: Product[] }} products
 * @property {{ conversionRate: number, avgOrderValue: number, customerAcquisition: number, returnRate: number }} marketing
 */

/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {boolean} earned
 * @property {Date} [earnedDate]
 * @property {string} criteria
 */

/**
 * @typedef {Object} Achievement
 * @property {number} streak
 * @property {number} totalSales
 * @property {number} productsListed
 * @property {Badge[]} badges
 * @property {number} level
 * @property {number} xp
 * @property {number} nextLevelXp
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {string} message
 * @property {'user' | 'ai'} type
 * @property {Date} timestamp
 * @property {string[]} [suggestions]
 * @property {string} [language]
*/