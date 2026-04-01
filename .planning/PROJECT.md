# GNOME Stage Manager

## Vision
macOS Stage Manager'in GNOME masaustune acik kaynakli, hizli ve goersel olarak cilali bir alternatifini olusturmak. Ileride farkli isimlerle yayinlanacak, topluluga sunulacak bir eklenti.

## Core Value
Pencere yoenetimini gorsel, akici ve sezgisel hale getirmek — macOS kalitesinde bir deneyimi Linux'a tasimak.

## Target Users
- Linux/GNOME kullanicilari
- macOS'tan gecis yapan kullanicilar
- Coklu pencereyle calisan power user'lar

## Technical Context
- **Platform:** GNOME Shell Extension (GJS / JavaScript)
- **Base:** magoness/Stage-Manager-Gnome fork'u (USER-chosen)
- **GNOME Version:** 45+ (ES Modules)
- **Rendering:** Clutter/St toolkit
- **Settings:** GSettings + Adw preferences

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] Kapatma butonu gorselini iyilestir (macOS benzeri temiz X)
- [ ] Thumbnail kartlarina border/golge ekle
- [ ] Hover animasyonlarini iyilestir
- [ ] Panel arka plani (yari-saydam blur efekti)
- [ ] Uygulama adi tooltip'i goster
- [ ] Aktif pencere vurgulama
- [ ] Sag tik context menu (kapat, minimize, always-on-top)
- [ ] Ayarlar paneline yeni toggle'lar
- [ ] Multi-monitor destegi iyilestirme

### Out of Scope (V1)
- Tamamen farkli pencere yoneticisi yazma
- Wayland compositor degisiklikleri
- Diger DE destegi (KDE, XFCE vb.)

## Key Decisions

| Decision | Source | Rationale | Outcome |
|----------|--------|-----------|---------|
| Fork uzerinden calisma | User | Mevcut calisir kod tabani var | Decided |
| macOS Stage Manager referans | User | Gorsel hedef belirli | Decided |
| Acik kaynak yayinlanacak | User | Topluluk katkisi icin | Decided |
| Private repo simdlik | User | Hazir olunca public yapilacak | Decided |
| Repo adi: gnome-stagemanager | User | Temiz isimlendirme | Decided |

---
*Last updated: 2026-04-02 after initialization*
