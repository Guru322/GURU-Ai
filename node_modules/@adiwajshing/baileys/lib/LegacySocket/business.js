"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const business_1 = require("../Utils/business");
const groups_1 = __importDefault(require("./groups"));
const makeBusinessSocket = (config) => {
    const sock = (0, groups_1.default)(config);
    const { query, generateMessageTag, waUploadToServer, state } = sock;
    const getCatalog = async (jid, limit = 10) => {
        var _a, _b;
        jid = jid || ((_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id);
        const result = await query({
            expect200: true,
            json: [
                'query',
                'bizCatalog',
                {
                    allowShopSource: false,
                    catalogWid: jid,
                    height: 100,
                    width: 100,
                    limit,
                    stanza_id: generateMessageTag(true),
                    type: 'get_product_catalog_reh',
                }
            ]
        });
        const products = result.data.data.map(mapProduct);
        return {
            beforeCursor: result.data.paging.cursors.before,
            products
        };
    };
    const productCreate = async (product) => {
        const result = await query({
            expect200: true,
            json: [
                'action',
                'addProduct_reh',
                await mapProductCreate(product)
            ]
        });
        return mapProduct(result.data.product);
    };
    const productDelete = async (productIds) => {
        const result = await query({
            expect200: true,
            json: [
                'action',
                'deleteProduct_reh',
                {
                    product_ids: productIds,
                    stanza_id: generateMessageTag(true),
                }
            ]
        });
        return {
            deleted: result.data.deleted_count
        };
    };
    const productUpdate = async (productId, update) => {
        const productCreate = await mapProductCreate({ ...update, originCountryCode: undefined }, false);
        const result = await query({
            expect200: true,
            json: [
                'action',
                'editProduct_reh',
                {
                    product_id: productId,
                    ...productCreate
                }
            ]
        });
        return mapProduct(result.data.product);
    };
    const getOrderDetails = async (orderId, tokenBase64) => {
        const result = await query({
            expect200: true,
            json: [
                'query',
                'order',
                {
                    id: generateMessageTag(true),
                    orderId,
                    imageWidth: '80',
                    imageHeight: '80',
                    token: tokenBase64
                }
            ]
        });
        const data = result.data;
        const order = {
            price: {
                currency: data.price.currency,
                total: data.price.total,
            },
            products: data.products.map(p => {
                var _a;
                return ({
                    id: p.id,
                    imageUrl: (_a = p.image) === null || _a === void 0 ? void 0 : _a.url,
                    name: p.name,
                    quantity: +p.quantity,
                    currency: p.currency,
                    price: +p.price
                });
            })
        };
        return order;
    };
    // maps product create to send to WA
    const mapProductCreate = async (product, mapCompliance = true) => {
        const imgs = (await (0, business_1.uploadingNecessaryImages)(product.images, waUploadToServer)).map(img => img.url);
        const result = {
            name: product.name,
            description: product.description,
            image_url: imgs[0],
            url: product.url || '',
            additional_image_urls: imgs.slice(1),
            retailer_id: product.retailerId || '',
            width: '100',
            height: '100',
            stanza_id: generateMessageTag(true),
            price: product.price.toString(),
            currency: product.currency
        };
        if (mapCompliance) {
            Object.assign(result, {
                compliance_category: product.originCountryCode
                    ? undefined :
                    'COUNTRY_ORIGIN_EXEMPT',
                compliance_info: product.originCountryCode
                    ? { country_code_origin: product.originCountryCode }
                    : undefined
            });
        }
        return result;
    };
    return {
        ...sock,
        getOrderDetails,
        getCatalog,
        productCreate,
        productDelete,
        productUpdate
    };
};
const mapProduct = (item) => ({
    id: item.id,
    name: item.name,
    retailerId: item.retailer_id,
    price: +item.price,
    description: item.description,
    currency: item.currency,
    imageUrls: item.image_cdn_urls.reduce((dict, { key, value }) => {
        dict[key] = value;
        return dict;
    }, {}),
    reviewStatus: item.capability_to_review_status.reduce((dict, { key, value }) => {
        dict[key] = value;
        return dict;
    }, {}),
    isHidden: item.is_hidden,
    availability: item.availability
});
exports.default = makeBusinessSocket;
