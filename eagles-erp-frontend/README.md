# Eagles ERP Frontend

Modern React tabanlı ERP sistemi frontend uygulaması.

## 🚀 Özellikler

- **Modern UI/UX**: Ant Design ile geliştirilmiş modern arayüz
- **Responsive Design**: Tüm cihazlarda uyumlu tasarım
- **Vessel Management**: Gemi yönetimi ve takip sistemi
- **Dashboard**: Kapsamlı dashboard ve analitik
- **Inventory Management**: Envanter yönetimi
- **Certificate Management**: Sertifika takip sistemi
- **Safety Management**: Güvenlik yönetimi
- **Maintenance Tracking**: Bakım takip sistemi

## 🛠️ Teknolojiler

- **React 19** - Modern React hooks ve functional components
- **TypeScript** - Tip güvenliği
- **Vite** - Hızlı build tool
- **Ant Design** - UI component library
- **React Router** - Client-side routing
- **Leaflet** - Harita entegrasyonu
- **React DnD** - Drag & drop functionality

## 📦 Kurulum

```bash
# Dependencies kurulumu
npm install

# Development server başlatma
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 🌐 Deployment

### GitHub Pages

Proje otomatik olarak GitHub Pages'e deploy edilir:

1. Main branch'e push yapın
2. GitHub Actions otomatik olarak build alır ve deploy eder
3. `https://[username].github.io/eagles-erp-frontend/` adresinden erişebilirsiniz

### Manuel Deploy

```bash
# Build alın
npm run build

# Dist klasörünü web sunucunuza yükleyin
```

## 📁 Proje Yapısı

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── types/         # TypeScript type definitions
├── data/          # Mock data
└── assets/        # Static assets
```

## 🔧 Geliştirme

### Yeni Sayfa Ekleme

1. `src/pages/` klasörüne yeni component ekleyin
2. `src/App.tsx` dosyasında route tanımlayın
3. Navigation menüsüne ekleyin

### Component Geliştirme

- Ant Design component'lerini kullanın
- TypeScript ile tip güvenliği sağlayın
- Responsive tasarım prensiplerini uygulayın

## 📊 Build Analizi

Son build'de:
- **Bundle Size**: ~1.5MB (gzipped: ~460KB)
- **Chunks**: Vendor, Antd, Router ayrı chunk'lar
- **Assets**: Optimized images ve CSS

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Herhangi bir sorun yaşarsanız:
1. GitHub Issues bölümünü kontrol edin
2. Yeni issue açın
3. Detaylı açıklama ve repro steps ekleyin
