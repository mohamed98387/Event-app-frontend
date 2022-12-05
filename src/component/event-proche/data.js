var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var dT = year + "-" + month + "-" + date;
var dateStr = dT.replace(/-0+/g, "-");

export const Start_date = [
  {
    _id: 0,
    name: "Aujourd'hui",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 86400000 - 1,
    ],
  },
  {
    _id: 1,
    name: "Cette semaine",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 604800000 - 1,
    ],
  },
  {
    _id: 2,
    name: "Ce mois-ci",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 2592000000 - 1,
    ],
  },
];
