# LinguAI

LinguAI, yapay zeka destekli interaktif **dil öğrenme** uygulamasıdır. Kullanıcılar istediği diller arasında **A1'den C2'ye kadar** farklı seviyelerde kelime çalışması yapabilir, **Gemini AI** ile cümle çevirisi alıştırmaları gerçekleştirebilir ve öğrenme performanslarını detaylı olarak takip edebilir.

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=black)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![License MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)


## Özellikler

- **Seviye Bazlı Öğrenme**: A1, A2, B1, B2, C1, C2 seviyelerinde kelime çalışması
- **Yapay Zeka Destekli Cümle Üretimi**: Gemini AI ile seviyeye uygun cümleler oluşturma
- **Çeviri Kontrolü**: Kullanıcı çevirilerinin AI tarafından kontrol edilmesi
- **Kelime Görüntüleme**: Her seviyeye ait kelime gruplarını görüntüleme ve inceleme
- **Egzersiz Geçmişi**: Tamamlanan egzersizlerin detaylı analizi ve görüntülenmesi
- **Performans Takibi**: Doğru/yanlış çeviri istatistikleri ve gelişim analizi
- **Kullanıcı Kimlik Doğrulama**: Supabase ile güvenli giriş sistemi

## Teknolojiler

- **Frontend**: React Native + Expo
- **Backend**: Supabase
- **AI**: Google Gemini API
- **Authentication**: Supabase Auth

---

## 📸 Ekran Görüntüleri

| **Hoş Geldiniz** | **Giriş Yap** | **Hesap Oluştur** |
|:---------:|:--------------:|:---------------:|
| <img src="assets/images/Screenshots/1- Hoş Geldiniz.png" width="250"> | <img src="assets/images/Screenshots/2- Giriş Yap.png" width="250"> | <img src="assets/images/Screenshots/3- Hesap Oluştur.png" width="250"> |

| **Profil** | **Ana Sayfa** | **Seviye Seçimi** |
|:--------------:|:-------------:|:-----------------:|
| <img src="assets/images/Screenshots/4- Profil.png" width="250"> | <img src="assets/images/Screenshots/5- Ana Sayfa.png" width="250"> | <img src="assets/images/Screenshots/6- Seviye Arayüzü.png" width="250"> |

| **Kelime Listesi** | **AI Destekli Çeviri** | **Geçmiş Egzersizler** |
|:----------------:|:------------:|:--------------------:|
| <img src="assets/images/Screenshots/7- Level Kelimeleri.png" width="250"> | <img src="assets/images/Screenshots/8- Türkçeden İngilizceye Çeviri.png" width="250"> | <img src="assets/images/Screenshots/9- Geçmiş Egzersizler.png" width="250"> |

---

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/AliKacarr/LinguAI-mobile.git
cd LinguAI-mobile
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Ortam değişkenlerini (`.env`) ayarlayın:

   - `.env.example` dosyasını kopyalayarak `.env` dosyası oluşturun:
     ```bash
     cp .env.example .env
     ```
   - `.env` dosyasındaki Gemini API anahtarı ve Supabase bilgilerini güncelleyin:
     ```env
     EXPO_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
     EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
     EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
     ```

4. Supabase veritabanını kurun:

   - Supabase projesi oluşturun
   - `database_schema.sql` dosyasını Supabase SQL editöründe çalıştırın

5. Uygulamayı başlatın:

```bash
npx expo start
```

## Veritabanı Yapısı

### Tablolar

- **language_levels**: Dil seviyeleri (A1-C2)
- **example_words**: Seviyeye göre kelime çiftleri
- **exercise_history**: Kullanıcı egzersiz geçmişi (kaynak cümle, kullanıcı çevirisi, doğruluk durumu, doğru çeviri)
- **users**: Kullanıcı bilgileri

## Kullanım

1. **Kayıt Ol/Giriş Yap**: Uygulamaya giriş yapın
2. **Seviye Seçin**: Ana ekranda çalışmak istediğiniz seviyeyi seçin
3. **Seviye Menüsü**: Seviye ekranında üç seçenek bulunur:
   - **Çalışmayı Başlat**: AI destekli çeviri egzersizlerini başlatır
   - **Kelimeler**: Seviyeye ait tüm kelime gruplarını görüntüler
   - **Geçmiş Egzersizler**: O seviyede tamamlanan egzersizlerin detaylı analizini gösterir
4. **Çeviri Yapın**: AI tarafından oluşturulan cümleyi çevirin
5. **Kontrol Edin**: "Kontrol Et" butonuna basarak çevirinizi kontrol edin
6. **Performansı İzleyin**: Geçmiş egzersizler sayfasında doğru/yanlış oranlarınızı ve gelişiminizi takip edin

## API Kullanımı

### Gemini AI Prompts

**Cümle Üretimi:**

```
Create a short {source language} sentence that contains only this {source language} word and is appropriate for {level} difficulty. word={word}
```

**Çeviri Kontrolü:**

```
English sentence: "{english_sentence}"
User's Turkish sentence: "{user_translation}"
If the given English sentence and the user's Turkish sentence answer match, just write me "True". If the user's translation is wrong, just write me the correct translation of the sentence
```
---

## Geliştirici

**Ali Kaçar**

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/alikacar23/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alikacar23/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/AliKacarr)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/@alikacardev)

[alikacardev@gmail.com](mailto:alikacardev@gmail.com)

---

## Lisans

Bu proje [MIT Lisansı](LICENSE.txt) ile lisanslanmıştır.

