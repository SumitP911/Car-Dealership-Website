'use strict';

/**
 * sell-your-car service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sell-your-car.sell-your-car');
