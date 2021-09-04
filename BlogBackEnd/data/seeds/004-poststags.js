exports.seed = (knex) => {
  return knex("poststags")
    .del()
    .then(() => {
      return knex("poststags").insert([
        {
          poststagsid: 1,
          postsid: 15,
          tagsid: 1,
        },
        {
          poststagsid: 2,
          postsid: 15,
          tagsid: 7,
        },
        {
          poststagsid: 3,
          postsid: 15,
          tagsid: 8,
        },
        {
          poststagsid: 4,
          postsid: 21,
          tagsid: 6,
        },
        {
          poststagsid: 5,
          postsid: 21,
          tagsid: 7,
        },
        {
          poststagsid: 6,
          postsid: 29,
          tagsid: 7,
        },
        {
          poststagsid: 7,
          postsid: 33,
          tagsid: 6,
        },
        {
          poststagsid: 8,
          postsid: 55,
          tagsid: 7,
        },
        {
          poststagsid: 9,
          postsid: 76,
          tagsid: 8,
        },
        {
          poststagsid: 10,
          postsid: 76,
          tagsid: 3,
        },
        {
          poststagsid: 11,
          postsid: 76,
          tagsid: 5,
        },
        {
          poststagsid: 12,
          postsid: 80,
          tagsid: 5,
        },
        {
          poststagsid: 13,
          postsid: 80,
          tagsid: 4,
        },
        {
          poststagsid: 14,
          postsid: 82,
          tagsid: 8,
        },
        {
          poststagsid: 15,
          postsid: 96,
          tagsid: 6,
        },
        {
          poststagsid: 16,
          postsid: 96,
          tagsid: 4,
        },
        {
          poststagsid: 17,
          postsid: 97,
          tagsid: 5,
        },
        {
          poststagsid: 18,
          postsid: 97,
          tagsid: 2,
        },
        {
          poststagsid: 19,
          postsid: 97,
          tagsid: 6,
        },
        {
          poststagsid: 20,
          postsid: 97,
          tagsid: 1,
        },
        {
          poststagsid: 21,
          postsid: 38,
          tagsid: 2,
        },
        {
          poststagsid: 22,
          postsid: 38,
          tagsid: 4,
        },
        {
          poststagsid: 23,
          postsid: 39,
          tagsid: 5,
        },
        {
          poststagsid: 24,
          postsid: 39,
          tagsid: 4,
        },
        {
          poststagsid: 25,
          postsid: 59,
          tagsid: 5,
        },
        {
          poststagsid: 26,
          postsid: 59,
          tagsid: 8,
        },
        {
          poststagsid: 27,
          postsid: 64,
          tagsid: 5,
        },
        {
          poststagsid: 28,
          postsid: 64,
          tagsid: 4,
        },
        {
          poststagsid: 29,
          postsid: 83,
          tagsid: 5,
        },
        {
          poststagsid: 30,
          postsid: 83,
          tagsid: 1,
        },
        {
          poststagsid: 31,
          postsid: 98,
          tagsid: 2,
        },
        {
          poststagsid: 32,
          postsid: 99,
          tagsid: 1,
        },
        {
          poststagsid: 33,
          postsid: 99,
          tagsid: 8,
        },
        {
          poststagsid: 34,
          postsid: 99,
          tagsid: 7,
        },
        {
          poststagsid: 35,
          postsid: 18,
          tagsid: 4,
        },
        {
          poststagsid: 36,
          postsid: 18,
          tagsid: 8,
        },
        {
          poststagsid: 37,
          postsid: 51,
          tagsid: 8,
        },
        {
          poststagsid: 38,
          postsid: 51,
          tagsid: 7,
        },
        {
          poststagsid: 39,
          postsid: 51,
          tagsid: 2,
        },
        {
          poststagsid: 40,
          postsid: 9,
          tagsid: 5,
        },
        {
          poststagsid: 41,
          postsid: 43,
          tagsid: 8,
        },
        {
          poststagsid: 42,
          postsid: 43,
          tagsid: 6,
        },
        {
          poststagsid: 43,
          postsid: 46,
          tagsid: 8,
        },
        {
          poststagsid: 44,
          postsid: 46,
          tagsid: 1,
        },
        {
          poststagsid: 45,
          postsid: 62,
          tagsid: 1,
        },
        {
          poststagsid: 46,
          postsid: 62,
          tagsid: 6,
        },
        {
          poststagsid: 47,
          postsid: 71,
          tagsid: 1,
        },
        {
          poststagsid: 48,
          postsid: 71,
          tagsid: 3,
        },
        {
          poststagsid: 49,
          postsid: 71,
          tagsid: 5,
        },
        {
          poststagsid: 50,
          postsid: 78,
          tagsid: 3,
        },
        {
          poststagsid: 51,
          postsid: 87,
          tagsid: 1,
        },
        {
          poststagsid: 52,
          postsid: 87,
          tagsid: 7,
        },
        {
          poststagsid: 53,
          postsid: 87,
          tagsid: 6,
        },
        {
          poststagsid: 54,
          postsid: 95,
          tagsid: 5,
        },
        {
          poststagsid: 55,
          postsid: 95,
          tagsid: 8,
        },
        {
          poststagsid: 56,
          postsid: 95,
          tagsid: 3,
        },
        {
          poststagsid: 57,
          postsid: 95,
          tagsid: 4,
        },
        {
          poststagsid: 58,
          postsid: 3,
          tagsid: 3,
        },
        {
          poststagsid: 59,
          postsid: 3,
          tagsid: 7,
        },
        {
          poststagsid: 60,
          postsid: 8,
          tagsid: 4,
        },
        {
          poststagsid: 61,
          postsid: 8,
          tagsid: 1,
        },
        {
          poststagsid: 62,
          postsid: 14,
          tagsid: 8,
        },
        {
          poststagsid: 63,
          postsid: 14,
          tagsid: 4,
        },
        {
          poststagsid: 64,
          postsid: 20,
          tagsid: 5,
        },
        {
          poststagsid: 65,
          postsid: 58,
          tagsid: 6,
        },
        {
          poststagsid: 66,
          postsid: 58,
          tagsid: 8,
        },
        {
          poststagsid: 67,
          postsid: 60,
          tagsid: 3,
        },
        {
          poststagsid: 68,
          postsid: 65,
          tagsid: 4,
        },
        {
          poststagsid: 69,
          postsid: 66,
          tagsid: 3,
        },
        {
          poststagsid: 70,
          postsid: 67,
          tagsid: 3,
        },
        {
          poststagsid: 71,
          postsid: 67,
          tagsid: 4,
        },
        {
          poststagsid: 72,
          postsid: 74,
          tagsid: 6,
        },
        {
          poststagsid: 73,
          postsid: 77,
          tagsid: 5,
        },
        {
          poststagsid: 74,
          postsid: 77,
          tagsid: 7,
        },
        {
          poststagsid: 75,
          postsid: 77,
          tagsid: 8,
        },
        {
          poststagsid: 76,
          postsid: 77,
          tagsid: 6,
        },
        {
          poststagsid: 77,
          postsid: 93,
          tagsid: 8,
        },
        {
          poststagsid: 78,
          postsid: 93,
          tagsid: 4,
        },
        {
          poststagsid: 79,
          postsid: 5,
          tagsid: 3,
        },
        {
          poststagsid: 80,
          postsid: 5,
          tagsid: 7,
        },
        {
          poststagsid: 81,
          postsid: 42,
          tagsid: 2,
        },
        {
          poststagsid: 82,
          postsid: 49,
          tagsid: 7,
        },
        {
          poststagsid: 83,
          postsid: 54,
          tagsid: 8,
        },
        {
          poststagsid: 84,
          postsid: 54,
          tagsid: 1,
        },
        {
          poststagsid: 85,
          postsid: 81,
          tagsid: 2,
        },
        {
          poststagsid: 86,
          postsid: 81,
          tagsid: 4,
        },
        {
          poststagsid: 87,
          postsid: 85,
          tagsid: 8,
        },
        {
          poststagsid: 88,
          postsid: 7,
          tagsid: 3,
        },
        {
          poststagsid: 89,
          postsid: 7,
          tagsid: 6,
        },
        {
          poststagsid: 90,
          postsid: 11,
          tagsid: 2,
        },
        {
          poststagsid: 91,
          postsid: 11,
          tagsid: 6,
        },
        {
          poststagsid: 92,
          postsid: 23,
          tagsid: 5,
        },
        {
          poststagsid: 93,
          postsid: 23,
          tagsid: 1,
        },
        {
          poststagsid: 94,
          postsid: 27,
          tagsid: 3,
        },
        {
          poststagsid: 95,
          postsid: 28,
          tagsid: 2,
        },
        {
          poststagsid: 96,
          postsid: 31,
          tagsid: 7,
        },
        {
          poststagsid: 97,
          postsid: 45,
          tagsid: 4,
        },
        {
          poststagsid: 98,
          postsid: 45,
          tagsid: 6,
        },
        {
          poststagsid: 99,
          postsid: 48,
          tagsid: 5,
        },
        {
          poststagsid: 100,
          postsid: 48,
          tagsid: 3,
        },
        {
          poststagsid: 101,
          postsid: 53,
          tagsid: 3,
        },
        {
          poststagsid: 102,
          postsid: 53,
          tagsid: 5,
        },
        {
          poststagsid: 103,
          postsid: 61,
          tagsid: 7,
        },
        {
          poststagsid: 104,
          postsid: 61,
          tagsid: 3,
        },
        {
          poststagsid: 105,
          postsid: 68,
          tagsid: 7,
        },
        {
          poststagsid: 106,
          postsid: 86,
          tagsid: 4,
        },
        {
          poststagsid: 107,
          postsid: 86,
          tagsid: 7,
        },
        {
          poststagsid: 108,
          postsid: 100,
          tagsid: 6,
        },
        {
          poststagsid: 109,
          postsid: 100,
          tagsid: 2,
        },
        {
          poststagsid: 110,
          postsid: 100,
          tagsid: 4,
        },
        {
          poststagsid: 111,
          postsid: 4,
          tagsid: 6,
        },
        {
          poststagsid: 112,
          postsid: 4,
          tagsid: 2,
        },
        {
          poststagsid: 113,
          postsid: 4,
          tagsid: 8,
        },
        {
          poststagsid: 114,
          postsid: 10,
          tagsid: 6,
        },
        {
          poststagsid: 115,
          postsid: 10,
          tagsid: 3,
        },
        {
          poststagsid: 116,
          postsid: 10,
          tagsid: 4,
        },
        {
          poststagsid: 117,
          postsid: 13,
          tagsid: 2,
        },
        {
          poststagsid: 118,
          postsid: 13,
          tagsid: 8,
        },
        {
          poststagsid: 119,
          postsid: 19,
          tagsid: 6,
        },
        {
          poststagsid: 120,
          postsid: 25,
          tagsid: 5,
        },
        {
          poststagsid: 121,
          postsid: 25,
          tagsid: 8,
        },
        {
          poststagsid: 122,
          postsid: 52,
          tagsid: 6,
        },
        {
          poststagsid: 123,
          postsid: 52,
          tagsid: 3,
        },
        {
          poststagsid: 124,
          postsid: 56,
          tagsid: 2,
        },
        {
          poststagsid: 125,
          postsid: 56,
          tagsid: 3,
        },
        {
          poststagsid: 126,
          postsid: 56,
          tagsid: 1,
        },
        {
          poststagsid: 127,
          postsid: 1,
          tagsid: 8,
        },
        {
          poststagsid: 128,
          postsid: 1,
          tagsid: 3,
        },
        {
          poststagsid: 129,
          postsid: 17,
          tagsid: 6,
        },
        {
          poststagsid: 130,
          postsid: 17,
          tagsid: 3,
        },
        {
          poststagsid: 131,
          postsid: 36,
          tagsid: 3,
        },
        {
          poststagsid: 132,
          postsid: 36,
          tagsid: 2,
        },
        {
          poststagsid: 133,
          postsid: 40,
          tagsid: 1,
        },
        {
          poststagsid: 134,
          postsid: 40,
          tagsid: 6,
        },
        {
          poststagsid: 135,
          postsid: 41,
          tagsid: 2,
        },
        {
          poststagsid: 136,
          postsid: 41,
          tagsid: 3,
        },
        {
          poststagsid: 137,
          postsid: 72,
          tagsid: 7,
        },
        {
          poststagsid: 138,
          postsid: 73,
          tagsid: 2,
        },
        {
          poststagsid: 139,
          postsid: 84,
          tagsid: 5,
        },
        {
          poststagsid: 140,
          postsid: 84,
          tagsid: 8,
        },
        {
          poststagsid: 141,
          postsid: 84,
          tagsid: 4,
        },
        {
          poststagsid: 142,
          postsid: 90,
          tagsid: 5,
        },
        {
          poststagsid: 143,
          postsid: 92,
          tagsid: 3,
        },
        {
          poststagsid: 144,
          postsid: 35,
          tagsid: 8,
        },
        {
          poststagsid: 145,
          postsid: 47,
          tagsid: 1,
        },
        {
          poststagsid: 146,
          postsid: 47,
          tagsid: 3,
        },
        {
          poststagsid: 147,
          postsid: 70,
          tagsid: 7,
        },
        {
          poststagsid: 148,
          postsid: 70,
          tagsid: 3,
        },
        {
          poststagsid: 149,
          postsid: 75,
          tagsid: 6,
        },
        {
          poststagsid: 150,
          postsid: 75,
          tagsid: 2,
        },
        {
          poststagsid: 151,
          postsid: 75,
          tagsid: 1,
        },
        {
          poststagsid: 152,
          postsid: 79,
          tagsid: 1,
        },
        {
          poststagsid: 153,
          postsid: 79,
          tagsid: 7,
        },
        {
          poststagsid: 154,
          postsid: 79,
          tagsid: 4,
        },
        {
          poststagsid: 155,
          postsid: 88,
          tagsid: 1,
        },
        {
          poststagsid: 156,
          postsid: 88,
          tagsid: 6,
        },
        {
          poststagsid: 157,
          postsid: 88,
          tagsid: 4,
        },
        {
          poststagsid: 158,
          postsid: 12,
          tagsid: 8,
        },
        {
          poststagsid: 159,
          postsid: 16,
          tagsid: 2,
        },
        {
          poststagsid: 160,
          postsid: 16,
          tagsid: 4,
        },
        {
          poststagsid: 161,
          postsid: 34,
          tagsid: 3,
        },
        {
          poststagsid: 162,
          postsid: 37,
          tagsid: 8,
        },
        {
          poststagsid: 163,
          postsid: 37,
          tagsid: 3,
        },
        {
          poststagsid: 164,
          postsid: 37,
          tagsid: 4,
        },
        {
          poststagsid: 165,
          postsid: 69,
          tagsid: 6,
        },
        {
          poststagsid: 166,
          postsid: 69,
          tagsid: 4,
        },
        {
          poststagsid: 167,
          postsid: 89,
          tagsid: 5,
        },
        {
          poststagsid: 168,
          postsid: 89,
          tagsid: 7,
        },
        {
          poststagsid: 169,
          postsid: 89,
          tagsid: 8,
        },
        {
          poststagsid: 170,
          postsid: 89,
          tagsid: 4,
        },
        {
          poststagsid: 171,
          postsid: 2,
          tagsid: 7,
        },
        {
          poststagsid: 172,
          postsid: 2,
          tagsid: 8,
        },
        {
          poststagsid: 173,
          postsid: 2,
          tagsid: 4,
        },
        {
          poststagsid: 174,
          postsid: 6,
          tagsid: 6,
        },
        {
          poststagsid: 175,
          postsid: 6,
          tagsid: 7,
        },
        {
          poststagsid: 176,
          postsid: 24,
          tagsid: 1,
        },
        {
          poststagsid: 177,
          postsid: 24,
          tagsid: 8,
        },
        {
          poststagsid: 178,
          postsid: 24,
          tagsid: 5,
        },
        {
          poststagsid: 179,
          postsid: 26,
          tagsid: 8,
        },
        {
          poststagsid: 180,
          postsid: 30,
          tagsid: 1,
        },
        {
          poststagsid: 181,
          postsid: 32,
          tagsid: 3,
        },
        {
          poststagsid: 182,
          postsid: 50,
          tagsid: 3,
        },
        {
          poststagsid: 183,
          postsid: 50,
          tagsid: 4,
        },
        {
          poststagsid: 184,
          postsid: 63,
          tagsid: 1,
        },
        {
          poststagsid: 185,
          postsid: 63,
          tagsid: 2,
        },
        {
          poststagsid: 186,
          postsid: 91,
          tagsid: 6,
        },
        {
          poststagsid: 187,
          postsid: 91,
          tagsid: 3,
        },
      ]);
    });
};
