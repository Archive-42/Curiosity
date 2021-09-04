
// MIRA Normalized data structure. Ideally, I'd normalize them into objects 
// with keys matching their database PKs rather than arrays and array indexes,
// but I simplified for this exercise.
export const getIncomeStatement = () => {
  
  const data = {
    months: [
      "January, 2020", // 0
      "February, 2020", // 1
      "March, 2020", // 2
    ],

    categories: [
      {
        name: "Revenue", // 0
        subcategory_ids: [0, 1],
        total: 663467,
      },
      {
        name: "Costs of Revenue", // 1
        subcategory_ids: [2, 3, 4],
        total: 176769,
      },
      {
        name: "Sales and Marketing", // 2
        subcategory_ids: [5, 6],
        total: 232253,
      },
      {
        name: "Net Profit", // 3
        subcategory_ids: [],
        total: 254445,
      }
    ],

    subcategories: [
      {
        name: "Services", // 0
        category_id: 0,
        monthly_values: [
          {
            month_id: 0,
            value: 20152
          },
          {
            month_id: 1,
            value: 25345
          },
          {
            month_id: 2,
            value: 30576
          }
        ]
      },
      {
        name: "Subscriptions", // 1
        category_id: 0,
        monthly_values: [
          {
            month_id: 0,
            value: 180745
          },
          {
            month_id: 1,
            value: 201082
          },
          {
            month_id: 2,
            value: 205567
          }
        ]
      },
      {
        name: "Cloud Hosting Expense", // 2
        category_id: 1,
        monthly_values: [
          {
            month_id: 0,
            value: 10405
          },
          {
            month_id: 1,
            value: 11478
          },
          {
            month_id: 2,
            value: 11900
          }
        ]
      },
      {
        name: "Customer Support Expense", // 3
        category_id: 1,
        monthly_values: [
          {
            month_id: 0,
            value: 20304
          },
          {
            month_id: 1,
            value: 20890
          },
          {
            month_id: 2,
            value: 22836
          }
        ],
      },
      {
        name: "Professional Support Expense", // 4
        category_id: 1,
        monthly_values: [
          {
            month_id: 0,
            value: 25875
          },
          {
            month_id: 1,
            value: 27958
          },
          {
            month_id: 2,
            value: 28123
          }
        ]
      },
      {
        name: "Total Sales", // 5
        category_id: 2,
        monthly_values: [
          {
            month_id: 0,
            value: 40874,
          },
          {
            month_id: 1,
            value: 45567,
          },
          {
            month_id: 2,
            value: 48946,
          }
        ]
      },
      {
        name: "Marketing Expense", // 6
        category_id: 2,
        monthly_values: [
          {
            month_id: 0,
            value: 30487,
          },
          {
            month_id: 1,
            value: 32476,
          },
          {
            month_id: 2,
            value: 33912,
          }
        ]
      },
    ],
  }


  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data);
    });
  }, 500);
};
