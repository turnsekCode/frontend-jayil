import axios from 'axios';
import { create } from 'xmlbuilder2';
import fs from 'fs';

const BASE_URL = 'https://jayil.es';
const PRODUCT_API = `https://backend-jayil.vercel.app/api/product/list`;

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

async function getProductUrls() {
  try {
    const res = await axios.get(PRODUCT_API);
    const products = res.data.products || [];

    return products.map((p) => ({
      loc: `${BASE_URL}/product/${p.slug}`,
      lastmod: today
    }));
  } catch (error) {
    console.error('❌ Error al obtener productos:', error.message);
    return [];
  }
}

async function generateSitemap() {
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/collection`,
    `${BASE_URL}/collection/collares`,
    `${BASE_URL}/collection/pulseras`,
    `${BASE_URL}/collection/pendientes`,
    `${BASE_URL}/collection/pendientes/aro`,
    `${BASE_URL}/collection/pendientes/corazon`,
    `${BASE_URL}/collection/pendientes/colette`,
    `${BASE_URL}/collection/pendientes/gota`,
    `${BASE_URL}/collection/pendientes/lea`,
    `${BASE_URL}/collection/pendientes/ovalo`,
    `${BASE_URL}/collection/pendientes/coleccion-floral`,
    `${BASE_URL}/collection/pendientes/elena`,
    `${BASE_URL}/collection/pendientes/cascada`,
    `${BASE_URL}/collection/pendientes/hoja`,
    `${BASE_URL}/collection/pendientes/circulo`,
    `${BASE_URL}/collection/pendientes/karina`
  ].map((url) => ({
    loc: url,
    lastmod: today
  }));

  const productUrls = await getProductUrls();

  const urls = [...staticUrls, ...productUrls];

  const urlset = urls.map(({ loc, lastmod }) => ({
    url: {
      loc,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8,
    },
  }));

  const xml = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })
    .ele(urlset)
    .end({ prettyPrint: true });

  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap generado correctamente con <lastmod> en /public/sitemap.xml');
}

generateSitemap();
