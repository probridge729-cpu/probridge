// Project photo galleries (client-supplied images, optimised into assets/projects/<slug>/).
// The FIRST photo is the main image on cards and detail pages. Each file has a -sm.jpg thumbnail.
// To add a project: put photo-01.jpg (+ photo-01-sm.jpg) … in assets/projects/<slug>/ and list them here.
// Entries: [file name, caption, width, height]
const GALLERIES = {
  "godrej-wonderla": {
    photos: [
      ["photo-01", "Villa-lined avenue", 1100, 500],
      ["photo-02", "Landscaped garden", 1080, 1080],
      ["photo-03", "Entrance gateway", 601, 769],
      ["photo-04", "Smart Plug & Play concept", 1080, 1080],
      ["photo-05", "Smart Plug & Play concept", 1080, 1080],
      ["photo-06", "Smart Plug & Play concept", 1080, 1080],
      ["photo-07", "Villa at dusk", 520, 200]
    ],
    plans: []
  },
  "prestige-palm-court": {
    photos: [
      ["photo-01", "Project perspective", 1600, 1130],
      ["photo-02", "Aerial view", 1600, 1130],
      ["photo-03", "Towers at night", 1600, 1131],
      ["photo-04", "Entrance lobby", 1600, 1131],
      ["photo-05", "Clubhouse", 1600, 1131],
      ["photo-06", "Swimming pool", 1600, 1130]
    ],
    plans: [
      ["plan-01", "2 BHK Classic – Unit type B4", 1024, 700],
      ["plan-02", "2 BHK Classic – Unit type B1", 1024, 700],
      ["plan-03", "3 BHK Aspire – Unit type C1", 1024, 700],
      ["plan-04", "Tower 01 & 03 – Floor plan", 1024, 700],
      ["plan-05", "Tower 02 – Refuge floor plan", 1024, 700]
    ]
  },
  "purva-windermere": {
    photos: [
      ["photo-01", "Tower at dusk", 954, 550],
      ["photo-02", "Residential towers", 954, 550],
      ["photo-03", "Swimming pool & clubhouse", 1600, 900],
      ["photo-04", "Tower view", 800, 682],
      ["photo-05", "Living room", 954, 550],
      ["photo-06", "Dining area", 954, 550],
      ["photo-07", "Pool deck", 500, 800]
    ],
    plans: [["plan-01", "Masterplan", 1476, 1275]]
  },
  "brigade-vanagaram": {
    photos: [
      ["photo-01", "Living room", 1200, 800],
      ["photo-02", "Living area", 448, 333],
      ["photo-03", "Lounge", 448, 333]
    ],
    plans: [["plan-01", "Masterplan", 1177, 799]]
  }
};
