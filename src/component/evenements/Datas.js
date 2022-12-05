var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var dT = year + "-" + month + "-" + date;
var dateStr = dT.replace(/-0+/g, "-");
export const Start_date = [
  {
    _id: 0,
    name: "Toutes les dates",
    array: [],
  },
  {
    _id: 1,
    name: "Aujourd'hui",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 86400000 - 1,
    ],
  },
  {
    _id: 2,
    name: "Cette semaine",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 604800000 - 1,
    ],
  },
  {
    _id: 3,
    name: "Ce mois-ci",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 2592000000 - 1,
    ],
  },
  {
    _id: 4,
    name: "Cette année",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 31536000000 - 1,
    ],
  },
];

export const Type_event = [
  { _id: 1, value: "Sportif" },
  { _id: 2, value: "Educatif" },
  { _id: 3, value: "Scientifique" },
  { _id: 4, value: "Culturel" },
  { _id: 5, value: "Artisanat" },
  { _id: 6, value: "Festivale" },
];

export const City = [
  { _id: 0, value: "", name: "tous" },
  { _id: 1, value: "Ariana", name: "Ariana" },
  { _id: 2, value: "Beja", name: "Ariana" },
  { _id: 3, value: "Ben Arous", name: "Ben Arous" },
  { _id: 4, value: "Bizerte", name: "Bizerte" },
  { _id: 5, value: "Gabes", name: "Gabes" },
  { _id: 6, value: "Gafsa", name: "Gafsa" },
  { _id: 7, value: "Jendouba", name: "Jendouba" },
  { _id: 8, value: "Kairouan", name: "Kairouan" },
  { _id: 9, value: "Kasserine", name: "Kasserine" },
  { _id: 10, value: "Kebili", name: "Kebili" },
  { _id: 11, value: "Kef", name: "Kef" },
  { _id: 12, value: "Mahdia", name: "Mahdia" },
  { _id: 13, value: "Manouba", name: "Manouba" },
  { _id: 14, value: "Medenine", name: "Medenine" },
  { _id: 15, value: "Monastir", name: "Monastir" },
  { _id: 16, value: "Nabeul", name: "Nabeul" },
  { _id: 17, value: "Sfax", name: "Sfax" },
  { _id: 18, value: "Sidi Bouzid", name: "Sidi Bouzid" },
  { _id: 19, value: "Siliana", name: "Siliana" },
  { _id: 20, value: "Sousse", name: "Sousse" },
  { _id: 21, value: "Tataouine", name: "Tataouine" },
  { _id: 22, value: "Tozeur", name: "Tozeur" },
  { _id: 23, value: "Tunis", name: "Tunis" },
  { _id: 24, value: "Zaghouan", name: "Zaghouan" },
];
