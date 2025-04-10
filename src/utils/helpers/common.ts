// Favorites & StockDetail common functions
import Storage from '@utils/Storage';

// Favori listesine hisse ekleme/çıkarma
export const toggleFavorite = async (stock: any) => {
  try {
    const storedData = await Storage.getItem('favorites');
    const currentFavorites = storedData ? JSON.parse(storedData) : [];

    const isFavorited = currentFavorites.some(
      (favoritedStock: any) => favoritedStock.sublink === stock.sublink
    );

    let updatedFavorites;
    if (isFavorited) {
      // Favoriden kaldır
      updatedFavorites = currentFavorites.filter(
        (item: any) => item.sublink !== stock.sublink
      );
    } else {
      // Favorilere ekle
      updatedFavorites = [...currentFavorites, stock];
    }

    await Storage.setItem('favorites', JSON.stringify(updatedFavorites));
    return !isFavorited;
  } catch (error) {
    console.error('Favori ekleme/çıkarma hatası:', error);
    return false;
  }
};

// Bir hisse senedinin favoride olup olmadığını kontrol et
export const isStockFavorited = async (stockSublink: string) => {
  try {
    const storedData = await Storage.getItem('favorites');
    if (!storedData) return false;

    const currentFavorites = JSON.parse(storedData);
    return currentFavorites.some(
      (favoritedStock: any) => favoritedStock.sublink === stockSublink
    );
  } catch (error) {
    console.error('Favori kontrol hatası:', error);
    return false;
  }
};

// Tüm favorileri getir
export const getFavorites = async () => {
  try {
    const storedData = await Storage.getItem('favorites');
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Favori listesini alma hatası:', error);
    return [];
  }
};
