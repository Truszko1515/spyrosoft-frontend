# Frontend Aplikacji Prognozy Pogody

Aplikacja webowa stworzona przy użyciu **React**, umożliwiająca użytkownikowi przeglądanie 7-dniowej prognozy pogody na podstawie aktualnej lokalizacji lub wskazanych współrzędnych. Aplikacja korzysta z backendowego API do pobierania danych pogodowych.

---

## Funkcjonalności

### Prognoza pogody
- Wyświetlanie 7-dniowej prognozy w czytelnej tabeli.
- Informacje obejmują:
  - Datę w formacie `DD/MM/YYYY`.
  - Ikonę warunków pogodowych.
  - Maksymalną i minimalną temperaturę.
  - Szacowaną generację energii słonecznej (kWh).

### Interaktywna mapa
- Umożliwia wybór lokalizacji za pomocą mapy **Leaflet**.
- Automatyczne uzupełnianie współrzędnych w formularzu po kliknięciu na mapie.

### Tryb Dark Mode
- Zmiana motywu aplikacji na ciemny lub jasny.
- Preferencje użytkownika zapisywane w `localStorage`.

### Responsywność
- Układ dostosowany do urządzeń desktopowych, tabletów i smartfonów.
  
---

## Technologie i narzędzia

- **React**: Zarządzanie stanem i interakcjami użytkownika.
- **React-Leaflet**: Obsługa interaktywnej mapy.
- **FontAwesome**: Ikony pogodowe.
- **CSS Media Queries**: Responsywność.
- **LocalStorage**: Zapisywanie preferencji trybu ciemnego.
---

## Instrukcja uruchomienia

### Lokalnie
1. Upewnij się, że masz zainstalowany **Node.js**.
2. Przejdź do katalogu projektu frontendu:
   ```bash
   npm install
   npm start

### Uruchamianie aplikacji w Dockerze
1. Zbuduj dockerowy obraz a następnie uruchom kontener na jego podstawie:
   ```bash
   docker-compose up --build

