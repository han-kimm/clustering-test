"use client";

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const FollowUpRatio = () => {
  // Parse the data from the text file
  const rawData = [
    {
      email: "julio.leon@haulla.com",
      followUp: 111,
      total: 151,
      followUpRatio: 73.50993377483444,
      SF: "SFD",
      Name: "Julio Leon",
      Status: "Senior AM",
      "평균 AR": 43.40857143,
      "누적 lead": 5,
      DMC: 400,
      Deal: 60,
      Docusign: 33,
      AQ: 22,
      "Deal Conversion Rate (%)": "14.50%",
      "DS Conversion Rate (%)": "56.90%",
      "official date": "2023-05-01",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.27,
      "DS Per Day\r": 0.15,
    },
    {
      email: "jison.flores@haulla.com",
      followUp: 68,
      total: 207,
      followUpRatio: 32.850241545893724,
      SF: "SFC",
      Name: "Jison Flores",
      Status: "Official",
      "평균 AR": 51.17447552,
      "누적 lead": 958,
      DMC: 362,
      Deal: 62,
      Docusign: 22,
      AQ: 12,
      "Deal Conversion Rate (%)": "17.13%",
      "DS Conversion Rate (%)": "35.48%",
      "official date": "2023-07-31",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.1,
    },
    {
      email: "carlson.pelayo@haulla.com",
      followUp: 107,
      total: 186,
      followUpRatio: 57.52688172043011,
      SF: "SFI",
      Name: "CARLSON PELAYO",
      Status: "Official",
      "평균 AR": 50.55722973,
      "누적 lead": 584,
      DMC: 141,
      Deal: 76,
      Docusign: 48,
      AQ: 16,
      "Deal Conversion Rate (%)": "53.90%",
      "DS Conversion Rate (%)": "63.16%",
      "official date": "2024-05-01",
      "4/1부터 WD": 183,
      "Deal Per Day": 0.42,
      "DS Per Day\r": 0.26,
    },
    {
      email: "john.elarmo@haulla.com",
      followUp: 57,
      total: 211,
      followUpRatio: 27.014218009478675,
      SF: "SFF",
      Name: "John Elarmo",
      Status: "GP",
      "평균 AR": 53.00066667,
      "누적 lead": 1074,
      DMC: 52,
      Deal: 8,
      Docusign: 1,
      AQ: 0,
      "Deal Conversion Rate (%)": "15.38%",
      "DS Conversion Rate (%)": "12.50%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.18,
      "DS Per Day\r": 0.02,
    },
    {
      email: "johana.ziejewski@haulla.com",
      followUp: 30,
      total: 93,
      followUpRatio: 32.25806451612903,
      SF: "SFJ",
      Name: "Johana Ziejewski",
      Status: "Senior AM",
      "평균 AR": 50.94233333,
      "누적 lead": 8617,
      DMC: 1104,
      Deal: 100,
      Docusign: 50,
      AQ: 15,
      "Deal Conversion Rate (%)": "9.06%",
      "DS Conversion Rate (%)": "50.00%",
      "official date": "2023-06-20",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.47,
      "DS Per Day\r": 0.23,
    },
    {
      email: "jeiven.marasigan@haulla.com",
      followUp: 51,
      total: 192,
      followUpRatio: 26.5625,
      SF: "SFF",
      Name: "Jeiven Marasigan",
      Status: "GP",
      "평균 AR": 47.36206897,
      "누적 lead": 1658,
      DMC: 204,
      Deal: 22,
      Docusign: 5,
      AQ: 0,
      "Deal Conversion Rate (%)": "10.78%",
      "DS Conversion Rate (%)": "22.73%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.49,
      "DS Per Day\r": 0.11,
    },
    {
      email: "kriszia.nacion@haulla.com",
      followUp: 100,
      total: 170,
      followUpRatio: 58.82352941176471,
      SF: "SFG",
      Name: "Kriszia Nacion",
      Status: "Official",
      "평균 AR": 54.12985401,
      "누적 lead": 10244,
      DMC: 988,
      Deal: 43,
      Docusign: 23,
      AQ: 12,
      "Deal Conversion Rate (%)": "4.35%",
      "DS Conversion Rate (%)": "53.49%",
      "official date": "2024-04-01",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.2,
      "DS Per Day\r": 0.11,
    },
    {
      email: "lanie.amen@haulla.com",
      followUp: 82,
      total: 178,
      followUpRatio: 46.06741573033708,
      SF: "SFI",
      Name: "Lanie Amen",
      Status: "GP",
      "평균 AR": 52.02565217,
      "누적 lead": 2334,
      DMC: 107,
      Deal: 6,
      Docusign: 1,
      AQ: 1,
      "Deal Conversion Rate (%)": "5.61%",
      "DS Conversion Rate (%)": "16.67%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.19,
      "DS Per Day\r": 0.03,
    },
    {
      email: "reyji.antonio@haulla.com",
      followUp: 163,
      total: 237,
      followUpRatio: 68.77637130801688,
      SF: "SFC",
      Name: "Reyji Antonio",
      Status: "Official",
      "평균 AR": 66.77060811,
      "누적 lead": 7614,
      DMC: 1539,
      Deal: 136,
      Docusign: 45,
      AQ: 11,
      "Deal Conversion Rate (%)": "8.84%",
      "DS Conversion Rate (%)": "33.09%",
      "official date": "2024-04-01",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.64,
      "DS Per Day\r": 0.21,
    },
    {
      email: "leslie.corbeza@haulla.com",
      followUp: 52,
      total: 134,
      followUpRatio: 38.80597014925373,
      SF: "SFF",
      Name: "Leslie Corbeza",
      Status: "Official",
      "평균 AR": 51.79285714,
      "누적 lead": 4447,
      DMC: 267,
      Deal: 18,
      Docusign: 6,
      AQ: 3,
      "Deal Conversion Rate (%)": "6.74%",
      "DS Conversion Rate (%)": "33.33%",
      "official date": "2024-05-28",
      "4/1부터 WD": 156,
      "Deal Per Day": 0.12,
      "DS Per Day\r": 0.04,
    },
    {
      email: "anna.goma@haulla.com",
      followUp: 50,
      total: 114,
      followUpRatio: 43.859649122807014,
      SF: "SFJ",
      Name: "Anna Goma",
      Status: "Official",
      "평균 AR": 50.12260163,
      "누적 lead": 9977,
      DMC: 784,
      Deal: 57,
      Docusign: 7,
      AQ: 5,
      "Deal Conversion Rate (%)": "7.27%",
      "DS Conversion Rate (%)": "12.28%",
      "official date": "2024-04-29",
      "4/1부터 WD": 185,
      "Deal Per Day": 0.31,
      "DS Per Day\r": 0.04,
    },
    {
      email: "joan.antao@haulla.com",
      followUp: 129,
      total: 203,
      followUpRatio: 63.54679802955665,
      SF: "SFI",
      Name: "Joan Antao",
      Status: "GP",
      "평균 AR": 51.36461538,
      "누적 lead": 3202,
      DMC: 201,
      Deal: 12,
      Docusign: 0,
      AQ: 0,
      "Deal Conversion Rate (%)": "5.97%",
      "DS Conversion Rate (%)": "0.00%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.27,
      "DS Per Day\r": 0,
    },
    {
      email: "larryson.agpasa@haulla.com",
      followUp: 76,
      total: 121,
      followUpRatio: 62.8099173553719,
      SF: "SFG",
      Name: "Larryson Agpasa",
      Status: "Official",
      "평균 AR": 47.32139706,
      "누적 lead": 4121,
      DMC: 362,
      Deal: 35,
      Docusign: 23,
      AQ: 6,
      "Deal Conversion Rate (%)": "9.67%",
      "DS Conversion Rate (%)": "65.71%",
      "official date": "2024-04-15",
      "4/1부터 WD": 199,
      "Deal Per Day": 0.18,
      "DS Per Day\r": 0.12,
    },
    {
      email: "deo.velarde@haulla.com",
      followUp: 38,
      total: 87,
      followUpRatio: 43.67816091954023,
      SF: "SFF",
      Name: "Deo Velarde",
      Status: "Official",
      "평균 AR": 48.94591549,
      "누적 lead": 4241,
      DMC: 106,
      Deal: 45,
      Docusign: 18,
      AQ: 10,
      "Deal Conversion Rate (%)": "42.45%",
      "DS Conversion Rate (%)": "40.00%",
      "official date": "2024-04-01",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.21,
      "DS Per Day\r": 0.08,
    },
    {
      email: "john.canillo@haulla.com",
      followUp: 60,
      total: 128,
      followUpRatio: 46.875,
      SF: "SFE",
      Name: "John Canillo",
      Status: "GP",
      "평균 AR": 48.32483871,
      "누적 lead": 1984,
      DMC: 137,
      Deal: 7,
      Docusign: 1,
      AQ: 1,
      "Deal Conversion Rate (%)": "5.11%",
      "DS Conversion Rate (%)": "14.29%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.16,
      "DS Per Day\r": 0.02,
    },
    {
      email: "eliza.divina@haulla.com",
      followUp: 54,
      total: 108,
      followUpRatio: 50,
      SF: "SFJ",
      Name: "Eliza Divina",
      Status: "Official",
      "평균 AR": 53.49632,
      "누적 lead": 9479,
      DMC: 767,
      Deal: 38,
      Docusign: 10,
      AQ: 6,
      "Deal Conversion Rate (%)": "4.95%",
      "DS Conversion Rate (%)": "26.32%",
      "official date": "2024-04-29",
      "4/1부터 WD": 185,
      "Deal Per Day": 0.21,
      "DS Per Day\r": 0.05,
    },
    {
      email: "nadja.vera@haulla.com",
      followUp: 89,
      total: 189,
      followUpRatio: 47.08994708994709,
      SF: "SFJ",
      Name: "Nadja Vera",
      Status: "GP",
      "평균 AR": 56.93181818,
      "누적 lead": 1447,
      DMC: 194,
      Deal: 14,
      Docusign: 3,
      AQ: 0,
      "Deal Conversion Rate (%)": "7.22%",
      "DS Conversion Rate (%)": "21.43%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.45,
      "DS Per Day\r": 0.1,
    },
    {
      email: "monica.lansang@haulla.com",
      followUp: 19,
      total: 93,
      followUpRatio: 20.43010752688172,
      SF: "SFE",
      Name: "Monica Lansang",
      Status: "GP",
      "평균 AR": 46.65,
      "누적 lead": 1136,
      DMC: 85,
      Deal: 3,
      Docusign: 1,
      AQ: 1,
      "Deal Conversion Rate (%)": "3.53%",
      "DS Conversion Rate (%)": "33.33%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.1,
      "DS Per Day\r": 0.03,
    },
    {
      email: "erlisa.salvacion@haulla.com",
      followUp: 80,
      total: 117,
      followUpRatio: 68.37606837606837,
      SF: "SFE",
      Name: "Erlisa Salvacion",
      Status: "Official",
      "평균 AR": 56.37245902,
      "누적 lead": 2982,
      DMC: 459,
      Deal: 37,
      Docusign: 14,
      AQ: 7,
      "Deal Conversion Rate (%)": "8.06%",
      "DS Conversion Rate (%)": "37.84%",
      "official date": "2024-08-05",
      "4/1부터 WD": 87,
      "Deal Per Day": 0.43,
      "DS Per Day\r": 0.16,
    },
    {
      email: "karl.limpin@haulla.com",
      followUp: 95,
      total: 142,
      followUpRatio: 66.90140845070422,
      SF: "SFF",
      Name: "Karl Limpin",
      Status: "Official",
      "평균 AR": 49.41084746,
      "누적 lead": 3626,
      DMC: 579,
      Deal: 45,
      Docusign: 5,
      AQ: 3,
      "Deal Conversion Rate (%)": "7.77%",
      "DS Conversion Rate (%)": "11.11%",
      "official date": "2024-08-05",
      "4/1부터 WD": 87,
      "Deal Per Day": 0.52,
      "DS Per Day\r": 0.06,
    },
    {
      email: "janraina.alimurong@haulla.com",
      followUp: 17,
      total: 67,
      followUpRatio: 25.37313432835821,
      SF: "SFI",
      Name: "Janraina Alimurong",
      Status: "Official",
      "평균 AR": 53.4227193,
      "누적 lead": 2096,
      DMC: 314,
      Deal: 58,
      Docusign: 6,
      AQ: 2,
      "Deal Conversion Rate (%)": "18.47%",
      "DS Conversion Rate (%)": "10.34%",
      "official date": "2024-05-13",
      "4/1부터 WD": 171,
      "Deal Per Day": 0.34,
      "DS Per Day\r": 0.04,
    },
    {
      email: "christyan.bautista@haulla.com",
      followUp: 135,
      total: 186,
      followUpRatio: 72.58064516129032,
      SF: "SFD",
      Name: "Christyan Bautista",
      Status: "Official",
      "평균 AR": 46.718,
      "누적 lead": 2288,
      DMC: 354,
      Deal: 13,
      Docusign: 5,
      AQ: 1,
      "Deal Conversion Rate (%)": "3.67%",
      "DS Conversion Rate (%)": "38.46%",
      "official date": "2024-07-22",
      "4/1부터 WD": 101,
      "Deal Per Day": 0.13,
      "DS Per Day\r": 0.05,
    },
    {
      email: "janice.cornelio@haulla.com",
      followUp: 42,
      total: 59,
      followUpRatio: 71.1864406779661,
      SF: "SFI",
      Name: "Janice Cornelio",
      Status: "Official",
      "평균 AR": 49.25380597,
      "누적 lead": 6023,
      DMC: 600,
      Deal: 119,
      Docusign: 17,
      AQ: 12,
      "Deal Conversion Rate (%)": "19.83%",
      "DS Conversion Rate (%)": "14.29%",
      "official date": "2023-12-11",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.56,
      "DS Per Day\r": 0.08,
    },
    {
      email: "liza.sanchez@haulla.com",
      followUp: 36,
      total: 66,
      followUpRatio: 54.54545454545454,
      SF: "SFD",
      Name: "Liza Sanchez",
      Status: "Official",
      "평균 AR": 42.68550459,
      "누적 lead": 3725,
      DMC: 426,
      Deal: 21,
      Docusign: 8,
      AQ: 6,
      "Deal Conversion Rate (%)": "4.93%",
      "DS Conversion Rate (%)": "38.10%",
      "official date": "2022-08-01",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.1,
      "DS Per Day\r": 0.04,
    },
    {
      email: "ezekiel.legaspi@haulla.com",
      followUp: 80,
      total: 175,
      followUpRatio: 45.714285714285715,
      SF: "SFA",
      Name: "Ezekiel Legaspi",
      Status: "GP",
      "평균 AR": 49.90967742,
      "누적 lead": 1003,
      DMC: 185,
      Deal: 9,
      Docusign: 5,
      AQ: 1,
      "Deal Conversion Rate (%)": "4.86%",
      "DS Conversion Rate (%)": "55.56%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.2,
      "DS Per Day\r": 0.11,
    },
    {
      email: "radilyn.ramirez@haulla.com",
      followUp: 56,
      total: 106,
      followUpRatio: 52.83018867924528,
      SF: "SFC",
      Name: "Radilyn Ramirez",
      Status: "Official",
      "평균 AR": 61.01435374,
      "누적 lead": 10351,
      DMC: 1603,
      Deal: 88,
      Docusign: 35,
      AQ: 10,
      "Deal Conversion Rate (%)": "5.49%",
      "DS Conversion Rate (%)": "39.77%",
      "official date": "2024-03-18",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.41,
      "DS Per Day\r": 0.16,
    },
    {
      email: "samantha.ardiente@haulla.com",
      followUp: 58,
      total: 94,
      followUpRatio: 61.702127659574465,
      SF: "SFJ",
      Name: "Samantha Ardiente",
      Status: "GP",
      "평균 AR": 52.38666667,
      "누적 lead": 1420,
      DMC: 269,
      Deal: 9,
      Docusign: 1,
      AQ: 0,
      "Deal Conversion Rate (%)": "3.35%",
      "DS Conversion Rate (%)": "11.11%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.03,
    },
    {
      email: "timothy.fullen@haulla.com",
      followUp: 24,
      total: 47,
      followUpRatio: 51.06382978723404,
      SF: "SFC",
      Name: "Timothy Fullen",
      Status: "GP",
      "평균 AR": 46.20190476,
      "누적 lead": 1289,
      DMC: 219,
      Deal: 9,
      Docusign: 0,
      AQ: 0,
      "Deal Conversion Rate (%)": "4.11%",
      "DS Conversion Rate (%)": "0.00%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0,
    },
    {
      email: "laryne.yparraguirre@haulla.com",
      followUp: 1,
      total: 16,
      followUpRatio: 6.25,
      SF: "SFE",
      Name: "Laryne Yparraguirre",
      Status: "GP",
      "평균 AR": 46.99863636,
      "누적 lead": 921,
      DMC: 81,
      Deal: 2,
      Docusign: 2,
      AQ: 0,
      "Deal Conversion Rate (%)": "2.47%",
      "DS Conversion Rate (%)": "100.00%",
      "official date": "2024-09-30",
      "4/1부터 WD": 31,
      "Deal Per Day": 0.06,
      "DS Per Day\r": 0.06,
    },
    {
      email: "via.mendoza@haulla.com",
      followUp: 45,
      total: 115,
      followUpRatio: 39.130434782608695,
      SF: "SFI",
      Name: "Via Mendoza",
      Status: "Official",
      "평균 AR": 55.81554795,
      "누적 lead": 1431,
      DMC: 205,
      Deal: 86,
      Docusign: 20,
      AQ: 14,
      "Deal Conversion Rate (%)": "41.95%",
      "DS Conversion Rate (%)": "23.26%",
      "official date": "2022-07-05",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.4,
      "DS Per Day\r": 0.09,
    },
    {
      email: "aaron.cabrera@haulla.com",
      followUp: 86,
      total: 154,
      followUpRatio: 55.84415584415584,
      SF: "SFJ",
      Name: "Aaron Cabrera",
      Status: "GP",
      "평균 AR": 54.62592593,
      "누적 lead": 2259,
      DMC: 282,
      Deal: 12,
      Docusign: 1,
      AQ: 1,
      "Deal Conversion Rate (%)": "4.26%",
      "DS Conversion Rate (%)": "8.33%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.27,
      "DS Per Day\r": 0.02,
    },
    {
      email: "jayl.cano@haulla.com",
      followUp: 3,
      total: 15,
      followUpRatio: 20,
      SF: "SFF",
      Name: "Jayl Cano",
      Status: "Official",
      "평균 AR": 50.05080645,
      "누적 lead": 1349,
      DMC: 212,
      Deal: 25,
      Docusign: 5,
      AQ: 2,
      "Deal Conversion Rate (%)": "11.79%",
      "DS Conversion Rate (%)": "20.00%",
      "official date": "2024-08-05",
      "4/1부터 WD": 87,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.06,
    },
    {
      email: "leen.ghazal@haulla.com",
      followUp: 99,
      total: 137,
      followUpRatio: 72.26277372262774,
      SF: "SFC",
      Name: "Leen Ghazal",
      Status: "Senior AM",
      "평균 AR": 59.61664384,
      "누적 lead": 2082,
      DMC: 712,
      Deal: 115,
      Docusign: 46,
      AQ: 29,
      "Deal Conversion Rate (%)": "16.15%",
      "DS Conversion Rate (%)": "40.00%",
      "official date": "2022-03-28",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.54,
      "DS Per Day\r": 0.22,
    },
    {
      email: "pocholo.aniel@haulla.com",
      followUp: 87,
      total: 137,
      followUpRatio: 63.503649635036496,
      SF: "SFA",
      Name: "Pocholo Aniel",
      Status: "Official",
      "평균 AR": 51.86218182,
      "누적 lead": 488,
      DMC: 118,
      Deal: 23,
      Docusign: 12,
      AQ: 5,
      "Deal Conversion Rate (%)": "19.49%",
      "DS Conversion Rate (%)": "52.17%",
      "official date": "2024-08-05",
      "4/1부터 WD": 87,
      "Deal Per Day": 0.26,
      "DS Per Day\r": 0.14,
    },
    {
      email: "janelle.vargas@haulla.com",
      followUp: 69,
      total: 101,
      followUpRatio: 68.31683168316832,
      SF: "SFA",
      Name: "Janelle Vargas",
      Status: "Official",
      "평균 AR": 50.06924138,
      "누적 lead": 1667,
      DMC: 598,
      Deal: 145,
      Docusign: 38,
      AQ: 16,
      "Deal Conversion Rate (%)": "24.25%",
      "DS Conversion Rate (%)": "26.21%",
      "official date": "2022-06-06",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.68,
      "DS Per Day\r": 0.18,
    },
    {
      email: "felix.ancheta@haulla.com",
      followUp: 15,
      total: 165,
      followUpRatio: 9.090909090909092,
      SF: "SFG",
      Name: "Felix Ancheta",
      Status: "GP",
      "평균 AR": 51.846,
      "누적 lead": 1861,
      DMC: 115,
      Deal: 7,
      Docusign: 1,
      AQ: 0,
      "Deal Conversion Rate (%)": "6.09%",
      "DS Conversion Rate (%)": "14.29%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.16,
      "DS Per Day\r": 0.02,
    },
    {
      email: "lourdes.molina@haulla.com",
      followUp: 44,
      total: 151,
      followUpRatio: 29.13907284768212,
      SF: "SFI",
      Name: "Lourdes Molina",
      Status: "Official",
      "평균 AR": 45.71747126,
      "누적 lead": 5103,
      DMC: 337,
      Deal: 42,
      Docusign: 8,
      AQ: 4,
      "Deal Conversion Rate (%)": "12.46%",
      "DS Conversion Rate (%)": "19.05%",
      "official date": "2024-06-24",
      "4/1부터 WD": 129,
      "Deal Per Day": 0.33,
      "DS Per Day\r": 0.06,
    },
    {
      email: "geah.escamos@haulla.com",
      followUp: 68,
      total: 97,
      followUpRatio: 70.10309278350515,
      SF: "SFA",
      Name: "Geah Escamos",
      Status: "Official",
      "평균 AR": 47.45056738,
      "누적 lead": 2574,
      DMC: 415,
      Deal: 115,
      Docusign: 48,
      AQ: 17,
      "Deal Conversion Rate (%)": "27.71%",
      "DS Conversion Rate (%)": "41.74%",
      "official date": "2024-01-22",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.54,
      "DS Per Day\r": 0.23,
    },
    {
      email: "darwin.espedillon@haulla.com",
      followUp: 24,
      total: 59,
      followUpRatio: 40.67796610169492,
      SF: "SFF",
      Name: "Darwin Espedillon",
      Status: "GP",
      "평균 AR": 58.7284,
      "누적 lead": 1630,
      DMC: 270,
      Deal: 25,
      Docusign: 7,
      AQ: 3,
      "Deal Conversion Rate (%)": "9.26%",
      "DS Conversion Rate (%)": "28.00%",
      "official date": "2024-08-19",
      "4/1부터 WD": 73,
      "Deal Per Day": 0.34,
      "DS Per Day\r": 0.1,
    },
    {
      email: "christian.garcia@haulla.com",
      followUp: 85,
      total: 106,
      followUpRatio: 80.18867924528303,
      SF: "SFD",
      Name: "Christian Garcia",
      Status: "GP",
      "평균 AR": 49.78607843,
      "누적 lead": 2762,
      DMC: 166,
      Deal: 8,
      Docusign: 5,
      AQ: 2,
      "Deal Conversion Rate (%)": "4.82%",
      "DS Conversion Rate (%)": "62.50%",
      "official date": "2024-08-19",
      "4/1부터 WD": 73,
      "Deal Per Day": 0.11,
      "DS Per Day\r": 0.07,
    },
    {
      email: "el.noel@haulla.com",
      followUp: 44,
      total: 68,
      followUpRatio: 64.70588235294117,
      SF: "SFI",
      Name: "El Noel",
      Status: "Official",
      "평균 AR": 43.22584507,
      "누적 lead": 6611,
      DMC: 457,
      Deal: 83,
      Docusign: 12,
      AQ: 9,
      "Deal Conversion Rate (%)": "18.16%",
      "DS Conversion Rate (%)": "14.46%",
      "official date": "2024-01-22",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.39,
      "DS Per Day\r": 0.06,
    },
    {
      email: "aljane.siarot@haulla.com",
      followUp: 90,
      total: 118,
      followUpRatio: 76.27118644067797,
      SF: "SFJ",
      Name: "Aljane Siarot",
      Status: "GP",
      "평균 AR": 60.63516129,
      "누적 lead": 2781,
      DMC: 241,
      Deal: 12,
      Docusign: 0,
      AQ: 0,
      "Deal Conversion Rate (%)": "4.98%",
      "DS Conversion Rate (%)": "0.00%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.27,
      "DS Per Day\r": 0,
    },
    {
      email: "juvelyn.regalado@haulla.com",
      followUp: 62,
      total: 116,
      followUpRatio: 53.44827586206896,
      SF: "SFA",
      Name: "Juvelyn Regalado",
      Status: "Official",
      "평균 AR": 52.33169231,
      "누적 lead": 1854,
      DMC: 442,
      Deal: 112,
      Docusign: 16,
      AQ: 7,
      "Deal Conversion Rate (%)": "25.34%",
      "DS Conversion Rate (%)": "14.29%",
      "official date": "2024-08-05",
      "4/1부터 WD": 87,
      "Deal Per Day": 1.29,
      "DS Per Day\r": 0.18,
    },
    {
      email: "teresa.cabanela@haulla.com",
      followUp: 69,
      total: 174,
      followUpRatio: 39.6551724137931,
      SF: "SFI",
      Name: "Teresa Cabanela",
      Status: "Official",
      "평균 AR": 49.70956835,
      "누적 lead": 3095,
      DMC: 436,
      Deal: 61,
      Docusign: 20,
      AQ: 6,
      "Deal Conversion Rate (%)": "13.99%",
      "DS Conversion Rate (%)": "32.79%",
      "official date": "2023-12-26",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.09,
    },
    {
      email: "jhan.bongon@haulla.com",
      followUp: 46,
      total: 78,
      followUpRatio: 58.97435897435898,
      SF: "SFA",
      Name: "Jhan Bongon",
      Status: "Official",
      "평균 AR": 49.79137615,
      "누적 lead": 5243,
      DMC: 331,
      Deal: 51,
      Docusign: 13,
      AQ: 8,
      "Deal Conversion Rate (%)": "15.41%",
      "DS Conversion Rate (%)": "25.49%",
      "official date": "2024-05-13",
      "4/1부터 WD": 171,
      "Deal Per Day": 0.3,
      "DS Per Day\r": 0.08,
    },
    {
      email: "jfrel.vallejo@haulla.com",
      followUp: 62,
      total: 95,
      followUpRatio: 65.26315789473685,
      SF: "SFG",
      Name: "Jfrel Vallejo",
      Status: "GP",
      "평균 AR": 46.3,
      "누적 lead": 1102,
      DMC: 106,
      Deal: 6,
      Docusign: 2,
      AQ: 0,
      "Deal Conversion Rate (%)": "5.66%",
      "DS Conversion Rate (%)": "33.33%",
      "official date": "2024-09-16",
      "4/1부터 WD": 45,
      "Deal Per Day": 0.13,
      "DS Per Day\r": 0.04,
    },
    {
      email: "nicole.bamba@haulla.com",
      followUp: 27,
      total: 100,
      followUpRatio: 27,
      SF: "SFI",
      Name: "Nicole Bamba",
      Status: "Official",
      "평균 AR": 44.55671533,
      "누적 lead": 3303,
      DMC: 346,
      Deal: 83,
      Docusign: 22,
      AQ: 14,
      "Deal Conversion Rate (%)": "23.99%",
      "DS Conversion Rate (%)": "26.51%",
      "official date": "2023-08-14",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.39,
      "DS Per Day\r": 0.1,
    },
    {
      email: "janet.villanueva@haulla.com",
      followUp: 40,
      total: 61,
      followUpRatio: 65.57377049180327,
      SF: "SFG",
      Name: "Janet Villanueva",
      Status: "Official",
      "평균 AR": 49.30585366,
      "누적 lead": 1558,
      DMC: 124,
      Deal: 30,
      Docusign: 7,
      AQ: 4,
      "Deal Conversion Rate (%)": "24.19%",
      "DS Conversion Rate (%)": "23.33%",
      "official date": "2024-06-24",
      "4/1부터 WD": 129,
      "Deal Per Day": 0.23,
      "DS Per Day\r": 0.05,
    },
    {
      email: "elvin.uy@haulla.com",
      followUp: 44,
      total: 105,
      followUpRatio: 41.904761904761905,
      SF: "SFF",
      Name: "Elvin Uy",
      Status: "Official",
      "평균 AR": 50.40062069,
      "누적 lead": 2599,
      DMC: 391,
      Deal: 75,
      Docusign: 21,
      AQ: 7,
      "Deal Conversion Rate (%)": "19.18%",
      "DS Conversion Rate (%)": "28.00%",
      "official date": "2024-03-04",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.35,
      "DS Per Day\r": 0.1,
    },
    {
      email: "yareny.solis@haulla.com",
      followUp: 24,
      total: 53,
      followUpRatio: 45.28301886792453,
      SF: "SFD",
      Name: "Yareny Solis",
      Status: "Senior AM",
      "평균 AR": 46.21394161,
      "누적 lead": 295,
      DMC: 266,
      Deal: 59,
      Docusign: 43,
      AQ: 33,
      "Deal Conversion Rate (%)": "22.18%",
      "DS Conversion Rate (%)": "72.88%",
      "official date": "2024-03-04",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.28,
      "DS Per Day\r": 0.2,
    },
    {
      email: "aivena.libao@haulla.com",
      followUp: 88,
      total: 194,
      followUpRatio: 45.36082474226804,
      SF: "SFF",
      Name: "Aivena Libao",
      Status: "Official",
      "평균 AR": 50.22394366,
      "누적 lead": 254,
      DMC: 72,
      Deal: 35,
      Docusign: 17,
      AQ: 10,
      "Deal Conversion Rate (%)": "48.61%",
      "DS Conversion Rate (%)": "48.57%",
      "official date": "2023-11-27",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.16,
      "DS Per Day\r": 0.08,
    },
    {
      email: "leslie.manite@haulla.com",
      followUp: 61,
      total: 114,
      followUpRatio: 53.50877192982456,
      SF: "SFJ",
      Name: "Leslie Manite",
      Status: "Official",
      "평균 AR": 53.93781955,
      "누적 lead": 2927,
      DMC: 1130,
      Deal: 172,
      Docusign: 41,
      AQ: 13,
      "Deal Conversion Rate (%)": "15.22%",
      "DS Conversion Rate (%)": "23.84%",
      "official date": "2022-10-24",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.81,
      "DS Per Day\r": 0.19,
    },
    {
      email: "yunice.celestial@haulla.com",
      followUp: 66,
      total: 135,
      followUpRatio: 48.888888888888886,
      SF: "SFJ",
      Name: "Yunice Celestial",
      Status: "Official",
      "평균 AR": 50.37059829,
      "누적 lead": 7192,
      DMC: 1241,
      Deal: 122,
      Docusign: 31,
      AQ: 10,
      "Deal Conversion Rate (%)": "9.83%",
      "DS Conversion Rate (%)": "25.41%",
      "official date": "2023-06-20",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.57,
      "DS Per Day\r": 0.15,
    },
    {
      email: "melody.tanala@haulla.com",
      followUp: 28,
      total: 64,
      followUpRatio: 43.75,
      SF: "SFI",
      Name: "Melody Tanala",
      Status: "Official",
      "평균 AR": 41.96881119,
      "누적 lead": 4036,
      DMC: 364,
      Deal: 62,
      Docusign: 24,
      AQ: 10,
      "Deal Conversion Rate (%)": "17.03%",
      "DS Conversion Rate (%)": "38.71%",
      "official date": "2022-08-29",
      "4/1부터 WD": 213,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.11,
    },
    {
      email: "kayebere.deniega@haulla.com",
      followUp: 65,
      total: 116,
      followUpRatio: 56.03448275862068,
      SF: "SFJ",
      Name: "Kayebere Deniega",
      Status: "Official",
      "평균 AR": 51.51480916,
      "누적 lead": 8221,
      DMC: 705,
      Deal: 57,
      Docusign: 16,
      AQ: 9,
      "Deal Conversion Rate (%)": "8.09%",
      "DS Conversion Rate (%)": "28.07%",
      "official date": "2024-04-15",
      "4/1부터 WD": 199,
      "Deal Per Day": 0.29,
      "DS Per Day\r": 0.08,
    },
  ];

  // Generate regression line points
  const regressionLines = {
    DMC: { slope: 4.11, intercept: 204.67 },
    Deal: { slope: 0.54, intercept: 23.23 },
    Docusign: { slope: 0.2, intercept: 5.93 },
    AQ: { slope: 0.1, intercept: 2.29 },
  };

  const generateRegressionPoints = (metric: keyof typeof regressionLines) => {
    const minRatio = 0;
    const maxRatio = 100;
    const { slope, intercept } = regressionLines[metric];

    return [
      { followUpRatio: minRatio, [metric]: slope * minRatio + intercept },
      { followUpRatio: maxRatio, [metric]: slope * maxRatio + intercept },
    ];
  };

  const metrics: { name: keyof typeof regressionLines; color: string }[] = [
    { name: "DMC", color: "#ff7300" },
    { name: "Deal", color: "#8884d8" },
    { name: "Docusign", color: "#82ca9d" },
    { name: "AQ", color: "#ffc658" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap">
        {metrics.map((metric) => (
          <div key={metric.name} className="w-1/2 p-8">
            <h2 className="text-[24px] text-center">
              Follow-up Ratio vs {metric.name}
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="followUpRatio"
                    type="number"
                    name="Follow-up Ratio"
                    label={{ value: "Follow-up Ratio (%)", position: "bottom" }}
                  />
                  <YAxis
                    name={metric.name}
                    label={{
                      value: metric.name,
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value) => [value, metric.name]}
                    labelFormatter={(value) =>
                      `Follow-up Ratio: ${value.toFixed(2)}%`
                    }
                  />
                  <Scatter
                    name={`${metric.name} Values`}
                    data={rawData}
                    fill={metric.color}
                    dataKey={metric.name}
                    xAxisId={0}
                    yAxisId={0}
                  />
                  <Line
                    name={`${metric.name} Trend`}
                    data={generateRegressionPoints(metric.name)}
                    dataKey={metric.name}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-[16px] text-gray-600 flex flex-col ml-20">
              <span>
                Correlation coefficient
                <strong className="ml-2 bg-black px-1 rounded text-white">
                  {
                    {
                      Deal: 0.22,
                      Docusign: 0.23,
                      AQ: 0.24,
                      DMC: 0.2,
                    }[metric.name]
                  }
                </strong>
              </span>
              <span>
                Regression Equation
                <strong className="ml-2 bg-black px-1 rounded text-white">
                  y = {regressionLines[metric.name].slope}x +{" "}
                  {regressionLines[metric.name].intercept}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpRatio;
