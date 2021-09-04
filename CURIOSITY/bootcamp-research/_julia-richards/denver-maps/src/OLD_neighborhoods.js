// writes new file at end of file
const fs = require("fs");

// old data format
const old = [
  {
    id: "cityParkWest",
    name: "City Park West",
    paths: [
      {
        lng: -104.959859,
        lat: 39.750638
      },
      {
        lng: -104.97327,
        lat: 39.750662
      },
      {
        lng: -104.97326,
        lat: 39.74007
      },
      {
        lng: -104.959859,
        lat: 39.740054
      }
    ],
    strokeWeight: 0,
    fillColor: "#f3765a",
    fillOpacity: 0.7,
    writeUp:
      "North of Cheesman Park and east of North Capitol Hill lies City Park West. The southern boundary of this area is Denver’s own main street, Colfax Avenue. Getting to downtown Denver from here is easy via 16th Avenue, with its painted bicycle lanes that feed directly into the heart of the central business district. City Park West is similar to Capitol Hill in several ways with its many historic stone mansions and vintage 1940’s-era apartment buildings. The Colfax corridor on the southern boundary provides shopping, dining, nightlife, and rapid bus transit.",
    keyFeats: [
      "16th Avenue Bicycle Corridor East to City Park or West to Downtown",
      "Multiple grocery stores within walking distance",
      "Major bus line nearby"
    ]
  },
  {
    id: "sloansLake",
    name: "Sloans Lake",
    paths: [
      {
        lat: 39.760857,
        lng: -105.026561
      },
      {
        lat: 39.761599,
        lng: -105.028363
      },
      {
        lat: 39.762036,
        lng: -105.029125
      },
      {
        lat: 39.762028,
        lng: -105.053157
      },
      {
        lat: 39.744071,
        lng: -105.053071
      },
      {
        lat: 39.744038,
        lng: -105.035884
      },
      {
        lat: 39.746431,
        lng: -105.035884
      },
      {
        lat: 39.746447,
        lng: -105.02537
      },
      {
        lat: 39.760214,
        lng: -105.025434
      },
      {
        lat: 39.760857,
        lng: -105.026561
      }
    ],
    strokeWeight: 0,
    fillColor: "#f3765a",
    fillOpacity: 0.7,
    writeUp:
      "Another neighborhood in northwest Denver, Sloan’s Lake takes its name from a local park that was once the site of two amusement parks. Until its demise by fire, Manhattan Beach was one of the premiere theme parks of the American West and featured a large roller coaster and a zoo in addition to a steamship that used the expansive waters of Sloan’s Lake for its self-styled voyages. Today, the neighborhood still delights in the park’s presence, which is a host for many summertime events, such as the Colorado Dragon Boat Festival paddleboat races.",
    keyFeats: [
      "Close to Auraria Higher Educational Campus",
      "Sloan's Lake Park nearby",
      "Close to mountain hiking trails and recreation areas",
      "Easy drive to downtown Denver",
      "Near Interstate 25"
    ]
  },
  {
    id: "highlands",
    name: "The Highlands",
    paths: [
      {
        lat: 39.769096,
        lng: -104.995565
      },
      {
        lat: 39.768518,
        lng: -104.995157
      },
      {
        lat: 39.766556,
        lng: -104.999663
      },
      {
        lat: 39.76555,
        lng: -105.001058
      },
      {
        lat: 39.761212,
        lng: -105.004448
      },
      {
        lat: 39.755521,
        lng: -105.012774
      },
      {
        lat: 39.757599,
        lng: -105.01904
      },
      {
        lat: 39.760354,
        lng: -105.024962
      },
      {
        lat: 39.769178,
        lng: -105.025069
      },
      {
        lat: 39.769228,
        lng: -104.997496
      },
      {
        lat: 39.769096,
        lng: -104.995565
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "One of Denver’s most popular and trendy neighborhoods, Highland is located immediately northwest of downtown and Denver Union Station. A multitude of facets make this area desirable for renters, such as its walking distance to downtown Denver, easy access to the Platte River Greenway, and the dozens of independently-owned restaurants, taverns, pubs, and small businesses. Live here and enjoy a 10-minute bicycle coast to downtown Denver and the city’s largest nightlife and entertainment district: Lower Downtown.",
    keyFeats: [
      "Close to downtown Denver and Union Station",
      "Quick access to the interstates (I-25 and I-70)",
      "Several restaurants, coffee shops, and wine bars",
      "Home to LoHi (Lower Highland) nightlife district with a countless number of social elements and amenities",
      "Short commute to Auraria Higher Educational Campus",
      "Near South Platte River greenway (major bicycle corridor)",
      "Seasonal farmers market"
    ]
  },
  {
    id: "jeffPark",
    name: "Jefferson Park",
    paths: [
      {
        lat: 39.746431,
        lng: -105.025005
      },
      {
        lat: 39.746447,
        lng: -105.023674
      },
      {
        lat: 39.747552,
        lng: -105.023374
      },
      {
        lat: 39.747635,
        lng: -105.021271
      },
      {
        lat: 39.747701,
        lng: -105.019168
      },
      {
        lat: 39.745111,
        lng: -105.018138
      },
      {
        lat: 39.743939,
        lng: -105.01625
      },
      {
        lat: 39.746216,
        lng: -105.015928
      },
      {
        lat: 39.749021,
        lng: -105.015757
      },
      {
        lat: 39.74973,
        lng: -105.015456
      },
      {
        lat: 39.750374,
        lng: -105.014898
      },
      {
        lat: 39.75171,
        lng: -105.012559
      },
      {
        lat: 39.752832,
        lng: -105.011487
      },
      {
        lat: 39.753821,
        lng: -105.010017
      },
      {
        lat: 39.75472,
        lng: -105.011873
      },
      {
        lat: 39.755793,
        lng: -105.014791
      },
      {
        lat: 39.757929,
        lng: -105.020585
      },
      {
        lat: 39.759207,
        lng: -105.023063
      },
      {
        lat: 39.760007,
        lng: -105.025026
      },
      {
        lat: 39.746431,
        lng: -105.025005
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Immediately south of the Highland neighborhood, Jefferson Park abuts several major travel sheds, including the South Platte River, Interstate 25, Speer Boulevard, and Federal Boulevard. A recent construction renaissance has refreshed the built-environment of this area throughout the past few years and has brought in new condominium buildings, as well as a large-scale rehabilitation of the original apartment housing stock. The result is a revitalized west-central Denver neighborhood that features many mixed-used amenities. These amenities have furthered enhanced this area’s door-step proximity to downtown Denver, the Lower Highland nightlife district, the South Platte River bike corridor, and the Auraria education campus. Live here and ride on your bike to the South Platte River trail in less than five minutes, or walk to Lower Highland and the Central Platte Valley in less than 15.",
    keyFeats: [
      "Biking distance to downtown Denver and Auraria Higher Educational Campus",
      "Easy drive to downtown Denver",
      "Less than 4 minutes to Interstate 25 from any location point within the neighborhood boundaries",
      "Major grocer located within neighborhood"
    ]
  },
  {
    id: "auraria",
    name: "Auraria",
    paths: [
      {
        lat: 39.753541,
        lng: -105.009448
      },
      {
        lat: 39.752419,
        lng: -105.007731
      },
      {
        lat: 39.751446,
        lng: -105.007023
      },
      {
        lat: 39.749813,
        lng: -105.004706
      },
      {
        lat: 39.748394,
        lng: -105.00344
      },
      {
        lat: 39.7462,
        lng: -105.001401
      },
      {
        lat: 39.745243,
        lng: -105.000908
      },
      {
        lat: 39.743032,
        lng: -105.000543
      },
      {
        lat: 39.740227,
        lng: -104.999148
      },
      {
        lat: 39.74059,
        lng: -105.013847
      },
      {
        lat: 39.742751,
        lng: -105.015027
      },
      {
        lat: 39.743675,
        lng: -105.015993
      },
      {
        lat: 39.7445,
        lng: -105.015521
      },
      {
        lat: 39.74681,
        lng: -105.01537
      },
      {
        lat: 39.748641,
        lng: -105.01522
      },
      {
        lat: 39.749912,
        lng: -105.014834
      },
      {
        lat: 39.753541,
        lng: -105.009448
      }
    ],
    strokeWeight: 0,
    fillColor: "#f5b71a",
    fillOpacity: 0.7,
    writeUp:
      "Founded in November 1858, the Auraria neighborhood began its life as a provision and supply town for miners, travelers, and American settlers. The town rivaled its sister city, Denver, then situated entirely across the Cherry Creek channel, and competed with it for territorial dominance. Within two years, the town was incorporated by Denver and became an important commercial node for the growing city as it accommodated switch yards for several railroad companies in addition to powerhouses for local utility generation firms. Over 150 years later the area is now the site of the Auraria Campus, where one community college and two public universities are located. The neighborhood is also home to the Denver Nuggets basketball team, as well and the Colorado Avalanche hockey organization. Other entertainment venues beside the Pepsi Center include Elitch Gardens Theme Park. Several historic structures occupy Auraria, including those located at Ninth Street Historic Park. Almost all apartment living in this location is presently limited to student housing communities.",
    keyFeats: [
      "Two light rail transportation lines serving most every line",
      "Auraria Campus (UCD, Metro State, CCD)",
      "Close proximity to South Platte River",
      "Pepsi Center",
      "Walking distance to downtown Denver"
    ]
  },
  {
    id: "capHill",
    name: "Cap Hill",
    paths: [
      {
        lat: 39.740062,
        lng: -104.987325
      },
      {
        lat: 39.739996,
        lng: -104.972991
      },
      {
        lat: 39.725652,
        lng: -104.973013
      },
      {
        lat: 39.725738,
        lng: -104.987373
      },
      {
        lat: 39.740062,
        lng: -104.987325
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "Capitol Hill is Denver’s second oldest neighborhood, after Five Points-Curtis Park. Rich in artistry, culture, and independent spirit, this neighborhood is the city’s favorite gathering grounds for hipsters and aspiring musicians. On the north end is Denver’s main street, which is home to several music theaters that each play venue to hundreds of big-name music artists every year. The area’s numerous historic structures (many of which are found on local, state, and national registries, such as the Molly Brown House and the Peabody-Whitehead Mansion), combined together with its well-developed social scene and endless number of coffee shops, independent restaurant, pubs, cigar bars, nightclubs and music halls to give Capitol Hill a broad spectrum of character. At nearly 20,000 people per square mile, Capitol Hill’s population density is greater than the citywide density averages for San Francisco, Boston, and Chicago. On the southern periphery is the Governor’s Park Historic District where stone mansions, adorned gargoyles, statues, and fountains add to the neighborhood’s Victorian feel.",
    keyFeats: [
      "Four different major grocery stores within walking distance",
      "High-frequency city bus routes serve the northern and western boundaries of this neighborhood",
      "Home to the Governor’s Park historic district",
      "Thriving nightlife scene"
    ]
  },
  {
    id: "civCenter",
    name: "Civic Center",

    paths: [
      {
        lat: 39.739963,
        lng: -104.997861
      },
      {
        lat: 39.740095,
        lng: -104.993033
      },
      {
        lat: 39.739996,
        lng: -104.990544
      },
      {
        lat: 39.740557,
        lng: -104.98887
      },
      {
        lat: 39.740029,
        lng: -104.98754
      },
      {
        lat: 39.727108,
        lng: -104.987432
      },
      {
        lat: 39.727323,
        lng: -104.988806
      },
      {
        lat: 39.739963,
        lng: -104.997861
      }
    ],
    strokeWeight: 0,
    fillColor: "#f5b71a",
    fillOpacity: 0.7,
    writeUp:
      "Just south of downtown Denver lies Civic Center. Although most people tend to be more familiar with its unofficial title, The Golden Triangle, Civic Center is probably the most appropriate description as the City and County of Denver’s original municipal hall and court building are located here. In this neighborhood you will find a limited assortment of character due to its close proximity to downtown Denver, where a zoning spillover has given Civic Center a heavily urbanized personality and flavor. The Denver Public Library’s central branch library, Denver Art Museum, and the History Colorado Center are all located within the three angles of this triangle-shaped area. The recent post-modern architecture found here has given this area a sense of modernity and help it fit seamlessly into the city’s overall sense of sophistication and progressiveness.",
    keyFeats: [
      "Broadway nightlife district",
      "Walking distance to downtown Denver",
      "Denver Art Museum",
      "Denver Public Library main central library branch",
      "Cherry Creek bike trail"
    ]
  },
  {
    id: "cityPark",
    name: "City Park",
    paths: [
      {
        lat: 39.740252,
        lng: -104.9581
      },
      {
        lat: 39.740227,
        lng: -104.950198
      },
      {
        lat: 39.74019,
        lng: -104.941953
      },
      {
        lat: 39.740243,
        lng: -104.940805
      },
      {
        lat: 39.750959,
        lng: -104.94088
      },
      {
        lat: 39.751099,
        lng: -104.945429
      },
      {
        lat: 39.751091,
        lng: -104.954795
      },
      {
        lat: 39.750877,
        lng: -104.957038
      },
      {
        lat: 39.750629,
        lng: -104.958883
      },
      {
        lat: 39.750646,
        lng: -104.959634
      },
      {
        lat: 39.740078,
        lng: -104.959693
      },
      {
        lat: 39.740252,
        lng: -104.9581
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Another neighborhood in northwest Denver, Sloan’s Lake takes its name from a local park that was once the site of two amusement parks. Until its demise by fire, Manhattan Beach was one of the premiere theme parks of the American West and featured a large roller coaster and a zoo in addition to a steamship that used the expansive waters of Sloan’s Lake for its self-styled voyages. Today, the neighborhood still delights in the park’s presence, which is a host for many summertime events, such as the Colorado Dragon Boat Festival paddleboat races.",
    keyFeats: [
      "Seasonal Farmers Market",
      "Natural-food grocery store within neighborhood",
      "Large park with crushed-gravel running paths, playfields, basketball courts, and tennis courts"
    ]
  },
  {
    id: "cherryCreek",
    name: "Cherry Creek",
    paths: [
      {
        lat: 39.725549,
        lng: -104.941256
      },
      {
        lat: 39.725507,
        lng: -104.940998
      },
      {
        lat: 39.72526,
        lng: -104.940891
      },
      {
        lat: 39.715935,
        lng: -104.94088
      },
      {
        lat: 39.705833,
        lng: -104.940783
      },
      {
        lat: 39.706179,
        lng: -104.942157
      },
      {
        lat: 39.711036,
        lng: -104.948133
      },
      {
        lat: 39.711053,
        lng: -104.949747
      },
      {
        lat: 39.711057,
        lng: -104.951904
      },
      {
        lat: 39.711049,
        lng: -104.95568
      },
      {
        lat: 39.711103,
        lng: -104.957333
      },
      {
        lat: 39.711156,
        lng: -104.959242
      },
      {
        lat: 39.711672,
        lng: -104.95928
      },
      {
        lat: 39.711936,
        lng: -104.959999
      },
      {
        lat: 39.712229,
        lng: -104.961587
      },
      {
        lat: 39.712415,
        lng: -104.96164
      },
      {
        lat: 39.71272,
        lng: -104.962461
      },
      {
        lat: 39.71303,
        lng: -104.962944
      },
      {
        lat: 39.713215,
        lng: -104.963684
      },
      {
        lat: 39.713253,
        lng: -104.966329
      },
      {
        lat: 39.714284,
        lng: -104.96635
      },
      {
        lat: 39.714668,
        lng: -104.96701
      },
      {
        lat: 39.714829,
        lng: -104.968587
      },
      {
        lat: 39.714775,
        lng: -104.973227
      },
      {
        lat: 39.71749,
        lng: -104.973109
      },
      {
        lat: 39.718481,
        lng: -104.973185
      },
      {
        lat: 39.719421,
        lng: -104.973201
      },
      {
        lat: 39.720127,
        lng: -104.972868
      },
      {
        lat: 39.72304,
        lng: -104.972863
      },
      {
        lat: 39.725524,
        lng: -104.97282
      },
      {
        lat: 39.725549,
        lng: -104.941256
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "Cherry Creek is a city neighborhood with rich variety. The shopping here is spectacular. An assortment of retail and amenity offerings make it possible to both cater to those with simple tastes and aggressive spending budgets. Almost 400 restaurants, pubs, cabarets, night clubs, retail shops, and other small business occupy the central portion of this neighborhood and offer a dynamic setting for diners and shoppers. Known as Cherry Creek North, this shopping district is Denver’s second most popular bucket-list item for out-of-state visitors. It’s safe to say that Cherry Creek provides fancy atmosphere for all.",
    keyFeats: [
      "Over 400 resturants, bars, taverns and small retailers",
      "Cherry Creek bicycle corridor",
      "Situated midpoint between downtown Denver and the Denver Technological Center",
      "Two large grocery stores"
    ]
  },
  {
    id: "uptown",
    name: "UpTown",
    paths: [
      {
        lat: 39.740165,
        lng: -104.987331
      },
      {
        lat: 39.747346,
        lng: -104.987309
      },
      {
        lat: 39.747482,
        lng: -104.987094
      },
      {
        lat: 39.747466,
        lng: -104.978286
      },
      {
        lat: 39.743754,
        lng: -104.973469
      },
      {
        lat: 39.740099,
        lng: -104.973533
      },
      {
        lat: 39.740165,
        lng: -104.987331
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Better known as “Uptown,” North Capitol Hill is situated directly next to downtown Denver. Close-up views of the city skyline make for breathtaking evening walks, while the immediacy of downtown Denver makes for an easy commute for people who work there. Denver’s second-most visited tourist destination, the 1.25-mile-long 16th Street Mall, is located at the far west end of the neighborhood and offers free bus service to and from Denver Union Station, located on the opposite end of downtown Denver. Known as the Free Mall Ride, this bus service stops at every intersection along the way to drop off and pick up passengers.",
    keyFeats: [
      "Two major grocery stores within walking distance",
      "High-frequency city bus route serves the southern boundary of this neighborhood",
      "Civic Center Station transit station located nearby",
      "Close to light rail transit station",
      "Near central downtown including the 16th Street Mall and Union Station"
    ]
  },
  {
    id: "uniPark",
    name: "University Park",
    paths: [
      {
        lat: 39.674774,
        lng: -104.959323
      },
      {
        lat: 39.679076,
        lng: -104.959269
      },
      {
        lat: 39.682808,
        lng: -104.959291
      },
      {
        lat: 39.684625,
        lng: -104.959323
      },
      {
        lat: 39.68493,
        lng: -104.949989
      },
      {
        lat: 39.682899,
        lng: -104.940644
      },
      {
        lat: 39.682164,
        lng: -104.940655
      },
      {
        lat: 39.680934,
        lng: -104.940891
      },
      {
        lat: 39.675335,
        lng: -104.940719
      },
      {
        lat: 39.667589,
        lng: -104.940687
      },
      {
        lat: 39.667622,
        lng: -104.945955
      },
      {
        lat: 39.667193,
        lng: -104.947167
      },
      {
        lat: 39.666986,
        lng: -104.947832
      },
      {
        lat: 39.66692,
        lng: -104.94853
      },
      {
        lat: 39.667094,
        lng: -104.949764
      },
      {
        lat: 39.667573,
        lng: -104.950976
      },
      {
        lat: 39.667647,
        lng: -104.959312
      },
      {
        lat: 39.674774,
        lng: -104.959323
      }
    ],
    strokeWeight: 0,
    fillColor: "#f3765a",
    fillOpacity: 0.7,
    writeUp:
      "Located at the southern end of Denver proper, University Park is centered around the University of Denver's historic Chamberlin Observatory. The Observatory was built in 1893 shortly after DU's relocation from central downtown to its current campus, which was once a potato farm. In the late 19th century, there was not easily accessible atomic clocks or the Internet. As such, the Observatory was one of DU's most reliable sources of revenue through selling the time to the railroads. Staff at Chamberlin did this by precisely measuring the angle above the horizon of the sun and stars and sending the result of their calculations via telegram to the nearby train station. The station would then recalibrate their clock to ensure the train was running according to schedule. Today, University Park is known for its generous elbow room and close relative proximity to the Denver Technological Center. The view plane levels out tremendously due to the single-family architecture that predominates this tract of the city. DU is within walking distance, while two major light rail stations with a park-and-ride feature can be quickly accessed by motor vehicle. Anyone desiring either an exurban feel or being within a reasonably close distance to the DTC would likely be right at home in University Park.",
    keyFeats: [
      "University of Denver and Colorado Station light rail stations nearby",
      "Observatory Park",
      "Univeristy of Denver closeby",
      "Near major interstate highway",
      "Short driving distance to Washington Park"
    ]
  },
  {
    id: "lincolnPark",
    name: "Lincoln Park",
    paths: [
      {
        lat: 39.740243,
        lng: -105.013804
      },
      {
        lat: 39.736877,
        lng: -105.013836
      },
      {
        lat: 39.734823,
        lng: -105.01478
      },
      {
        lat: 39.732793,
        lng: -105.015521
      },
      {
        lat: 39.731646,
        lng: -105.015435
      },
      {
        lat: 39.730632,
        lng: -105.015145
      },
      {
        lat: 39.728057,
        lng: -105.014255
      },
      {
        lat: 39.726687,
        lng: -105.013718
      },
      {
        lat: 39.725837,
        lng: -105.013203
      },
      {
        lat: 39.725738,
        lng: -104.987497
      },
      {
        lat: 39.726993,
        lng: -104.987411
      },
      {
        lat: 39.727323,
        lng: -104.988827
      },
      {
        lat: 39.73993,
        lng: -104.998891
      },
      {
        lat: 39.740243,
        lng: -105.013804
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Lincoln Park is Denver’s biggest gathering ground for the city’s many art aficionados. Nearly 40 galleries occupy the Santa Fe Arts District, which runs directly through the heart of this neighborhood and attracts an invariably large number of those who appreciate creative disciplines on the first Friday of every month. A light rail station located at 10th Avenue and Osage Street serves the neighborhood and provides a car-free commute to the Denver Technological Center as well as the suburban communities of Englewood and Littleton. Downtown Denver is a short walk away, as is the Auraria educational campus.",
    keyFeats: ["Light rail transit", "Sante Fe Art District"]
  },
  {
    id: "congressPark",
    name: "Congress Park",
    paths: [
      {
        lat: 39.740062,
        lng: -104.941974
      },
      {
        lat: 39.740087,
        lng: -104.949871
      },
      {
        lat: 39.74012,
        lng: -104.958014
      },
      {
        lat: 39.740054,
        lng: -104.958701
      },
      {
        lat: 39.738808,
        lng: -104.958711
      },
      {
        lat: 39.738115,
        lng: -104.958529
      },
      {
        lat: 39.736374,
        lng: -104.958497
      },
      {
        lat: 39.733305,
        lng: -104.958497
      },
      {
        lat: 39.732826,
        lng: -104.958508
      },
      {
        lat: 39.73215,
        lng: -104.958958
      },
      {
        lat: 39.731869,
        lng: -104.959119
      },
      {
        lat: 39.731539,
        lng: -104.959151
      },
      {
        lat: 39.729113,
        lng: -104.958937
      },
      {
        lat: 39.727364,
        lng: -104.958926
      },
      {
        lat: 39.726052,
        lng: -104.958915
      },
      {
        lat: 39.725796,
        lng: -104.958904
      },
      {
        lat: 39.725681,
        lng: -104.958786
      },
      {
        lat: 39.725681,
        lng: -104.940869
      },
      {
        lat: 39.740021,
        lng: -104.940837
      },
      {
        lat: 39.740062,
        lng: -104.941974
      }
    ],
    strokeWeight: 0,
    fillColor: "#f5b71a",
    fillOpacity: 0.7,
    writeUp:
      "Cerebral. Sophisticated. Responsible. If any list of words could be utilized to personify the character of Congress Park it could very well include those three. This east-central Denver neighborhood is known for the presence of a large and nationally-known book retailer, several lecture halls, and two high-performing public elementary schools, as well as its close proximity to Denver East High School, two of the country’s top holistic medicine post-secondary educational institutes, and multiple museums and historic landmarks. Denver’s main street, Colfax Avenue, is the established north boundary of this neighborhood and has a plethora of nightlife venues. Also, shopping for healthy and organic grocery products in Congress Park is easy, thanks to the three natural food stores that are located in the neighborhood’s general vicinity.",
    keyFeats: ["Congress Park Recreation Center", "SoCo Nightlife District"]
  },
  {
    id: "baker",
    name: "Baker",
    paths: [
      {
        lat: 39.725639,
        lng: -105.007989
      },
      {
        lat: 39.725565,
        lng: -105.003654
      },
      {
        lat: 39.725549,
        lng: -105.000886
      },
      {
        lat: 39.725648,
        lng: -105.000071
      },
      {
        lat: 39.725557,
        lng: -104.986853
      },
      {
        lat: 39.71109,
        lng: -104.98696
      },
      {
        lat: 39.701144,
        lng: -104.986832
      },
      {
        lat: 39.702877,
        lng: -104.989235
      },
      {
        lat: 39.703563,
        lng: -104.991134
      },
      {
        lat: 39.704405,
        lng: -104.993698
      },
      {
        lat: 39.705057,
        lng: -104.995018
      },
      {
        lat: 39.705973,
        lng: -104.996058
      },
      {
        lat: 39.706856,
        lng: -104.996606
      },
      {
        lat: 39.708911,
        lng: -104.997571
      },
      {
        lat: 39.711008,
        lng: -104.998623
      },
      {
        lat: 39.714391,
        lng: -105.000736
      },
      {
        lat: 39.716026,
        lng: -105.001895
      },
      {
        lat: 39.717065,
        lng: -105.003204
      },
      {
        lat: 39.718493,
        lng: -105.005275
      },
      {
        lat: 39.719574,
        lng: -105.006519
      },
      {
        lat: 39.72075,
        lng: -105.007742
      },
      {
        lat: 39.722042,
        lng: -105.009223
      },
      {
        lat: 39.72311,
        lng: -105.010666
      },
      {
        lat: 39.724237,
        lng: -105.011969
      },
      {
        lat: 39.725474,
        lng: -105.012978
      },
      {
        lat: 39.725639,
        lng: -105.007989
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "Head south out of downtown Denver and within one mile of your journey you will arrive in the historic Baker neighborhood. No other area in the city has such a balanced genre of aesthetic flavors. On the west end resides the South Platte River, Interstate 25, Union Pacific and BNSF Railway’s Consolidated Main Line, a light rail transportation corridor, and several industrial parks. On the east end is a beautiful and distinct residential sector that offers a sharp, chromatic contrast thanks to its rich civic detail, human-scale architecture, main-street retail shopping, hundred-year-old trees, flagstone sidewalks, and presence of over one-hundred historic homes, which have earned the southeastern corner of this neighborhood an official historic area designation. Although predominately zoned industrial at the present time, the west end of Baker is undergoing rapid redevelopment thanks to the mass transit rail line. Commercial buildings here are being bought and repurposed as residential lofts, boutique office space, and mixed-use spaces. All-inclusive fitness centers, art galleries, doggie daycares, indoor paintball battlefields, and post-modern style housing stock can now be found occupying structures and land parcels that were formerly used by industrial-type businesses. The transition is integrating both east and west Baker and is establishing a consistent land-use pattern that is adding to Baker’s already-dynamic feel. On the west end of Baker is the South Broadway shopping and nightlife district, where pubs, shops, and other small businesses occupy a mile-plus-long stretch of Denver’s Lincoln/Broadway Street corridor. A rapid-service bus line also here also provides easy access to downtown Denver during peak service hours. All of these key features help Baker earn its distinction of being one of Denver’s top neighborhoods.",
    keyFeats: [
      "South Broadway nightlife and shopping district",
      "Sante Fe Art District",
      "Rapid bus service to and from downtown Denver"
    ]
  },
  {
    id: "uni",
    name: "University",
    paths: [
      {
        lat: 39.684823,
        lng: -104.961297
      },
      {
        lat: 39.685219,
        lng: -104.963443
      },
      {
        lat: 39.685921,
        lng: -104.965234
      },
      {
        lat: 39.686833,
        lng: -104.966994
      },
      {
        lat: 39.689917,
        lng: -104.973383
      },
      {
        lat: 39.68396,
        lng: -104.973372
      },
      {
        lat: 39.677846,
        lng: -104.973399
      },
      {
        lat: 39.665892,
        lng: -104.973431
      },
      {
        lat: 39.665875,
        lng: -104.968764
      },
      {
        lat: 39.660457,
        lng: -104.968775
      },
      {
        lat: 39.660412,
        lng: -104.959537
      },
      {
        lat: 39.672561,
        lng: -104.959473
      },
      {
        lat: 39.684806,
        lng: -104.959645
      },
      {
        lat: 39.684823,
        lng: -104.961297
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "Across Interstate 25 from Washington Park and Washington Park West, this neighborhood comes with a suburban feel and is home to University of Denver. The DU campus occupies a considerable portion of this area and brings an invigorating ambiance. A light rail line is located at the north end and features a large park-and-ride. This transit route provides service to and from downtown Denver and the Denver Technological Center.",
    keyFeats: [
      "University of Denver campus",
      "Large light rail station",
      "Washington Park close by"
    ]
  },
  {
    id: "centralDowntown",
    name: "Central Downtown",
    paths: [
      {
        lat: 39.755339,
        lng: -105.012302
      },
      {
        lat: 39.761426,
        lng: -105.003526
      },
      {
        lat: 39.763521,
        lng: -105.002067
      },
      {
        lat: 39.765616,
        lng: -104.999921
      },
      {
        lat: 39.76677,
        lng: -104.997775
      },
      {
        lat: 39.767611,
        lng: -104.995179
      },
      {
        lat: 39.760073,
        lng: -104.994835
      },
      {
        lat: 39.754531,
        lng: -104.987518
      },
      {
        lat: 39.740144,
        lng: -104.987561
      },
      {
        lat: 39.740788,
        lng: -104.988827
      },
      {
        lat: 39.740227,
        lng: -104.990522
      },
      {
        lat: 39.740293,
        lng: -104.998011
      },
      {
        lat: 39.743659,
        lng: -104.999749
      },
      {
        lat: 39.746167,
        lng: -105.000092
      },
      {
        lat: 39.747981,
        lng: -105.002517
      },
      {
        lat: 39.749037,
        lng: -105.00329
      },
      {
        lat: 39.751842,
        lng: -105.006701
      },
      {
        lat: 39.75298,
        lng: -105.007624
      },
      {
        lat: 39.755339,
        lng: -105.012302
      }
    ],
    strokeWeight: 0,
    fillColor: "#f3765a",
    fillOpacity: 0.7,
    writeUp:
      "Downtown Denver is the state’s largest employment center and is also the 10th biggest central business district in the entire nation. Several notable multinational firms are headquartered here in addition to the Colorado Rockies Major League Baseball organization. Both downtown Denver and Union Station are served by mass transit rail lines that radiate into the city center from the southern metro area suburbs of Lone Tree, Centennial, Englewood, Greenwood Village, Littleton, Sheridan, and Englewood. Downtown Denver is additionally served by a rail transit line that originates from the eastern suburb of Aurora, while Union Station is additionally served by a rail line that begins in the mountain foothills town of Golden and passes through the western Denver suburb of Lakewood before reaching the Denver Union Station terminus. Starting 2016, the metro area’s public transit agency will begin phasing in an electrified commuter rail service for the northern suburbs of Denver. The opening of these rail lines will commence in incremental stages throughout a period of about half a decade and will provide rapid, fixed-route travel options between the Union Station neighborhood and Denver International Airport, as well as the cities of Wheat Ridge, Arvada, Westminster, Aurora, Northglenn, Thornton, and Welby. Aside from its growing multi-modal ethos, downtown Denver has one of the country’s most highly cultured social environments. The historic Colorado state capitol building is positioned at the southeastern corner of the central business district and lends a strong essence of civic pride. Many other sub-zones and sub-communities are located in both downtown Denver and the Union Station neighborhood and include the Lower Downtown nightlife and entertainment district, which is the largest in the state among the 16th Street Mall shopping district, Colorado’s number one destination for tourists.",
    keyFeats: [
      "Coors Field baseball stadium",
      "16th Street Mall",
      "Central Business District",
      "Denver Financial District",
      "Denver Union Station",
      "Lower Downtown (LoDo) nightlife and entertainment district",
      "Larimer Square",
      "Colorado Convention Center"
    ]
  },
  {
    id: "westHigh",
    name: "West Highlands",
    paths: [
      {
        lat: 39.769162,
        lng: -105.02537
      },
      {
        lat: 39.769458,
        lng: -105.034618
      },
      {
        lat: 39.769327,
        lng: -105.039231
      },
      {
        lat: 39.769244,
        lng: -105.053114
      },
      {
        lat: 39.762201,
        lng: -105.05305
      },
      {
        lat: 39.762201,
        lng: -105.02876
      },
      {
        lat: 39.761739,
        lng: -105.028116
      },
      {
        lat: 39.761195,
        lng: -105.026764
      },
      {
        lat: 39.760519,
        lng: -105.025455
      },
      {
        lat: 39.769162,
        lng: -105.02537
      }
    ],
    strokeWeight: 0,
    fillColor: "#f5b71a",
    fillOpacity: 0.7,
    writeUp:
      "Located in northwest Denver, West Highland has a relatively slower pace of life when compared to other urbanized areas of the city. Its location on the western end of the Denver city limits makes for easy commuting to and from the Rocky Mountain foothills, where dozens of popular hiking trails, such as those at White Ranch, North Table Mountain, and Dinosaur Ridge, are available for taking either a quick and easy day hike or a day-long backpacking adventure. Although a touch calmer in its demeanor, West Highland is by no means devoid of social complexity and enthusiasm. A former streetcar corridor, 32nd Avenue, is West Highland’s main street and is famous for its many pubs, taverns, and small businesses. On the north end of the neighborhood begins the Tennyson Street Art District, where the talents of numerous local artists and musicians are celebrated on designated days and weekends throughout each month. The Lower Highland (LoHi) nightlife district is also located just a few minutes away by car, bus, or bike.",
    keyFeats: [
      "Short commute to Auraria Higher Educational Campus of Community College of Denver, Metropolitan State University of Denver, and University of Colorado Denver.",
      "Sloan's Lake Park nearby",
      "Close to mountain hiking trails and recreation areas",
      "Easy drive to downtown Denver",
      "Near Interstate 25"
    ]
  },
  {
    id: "washPark",
    name: "Wash Park",
    paths: [
      {
        lat: 39.694701,
        lng: -104.973367
      },
      {
        lat: 39.700186,
        lng: -104.973329
      },
      {
        lat: 39.711181,
        lng: -104.973345
      },
      {
        lat: 39.712947,
        lng: -104.973351
      },
      {
        lat: 39.714268,
        lng: -104.973351
      },
      {
        lat: 39.714742,
        lng: -104.97326
      },
      {
        lat: 39.714812,
        lng: -104.968614
      },
      {
        lat: 39.714664,
        lng: -104.967048
      },
      {
        lat: 39.714268,
        lng: -104.966393
      },
      {
        lat: 39.713236,
        lng: -104.966356
      },
      {
        lat: 39.713191,
        lng: -104.963679
      },
      {
        lat: 39.713017,
        lng: -104.962965
      },
      {
        lat: 39.712712,
        lng: -104.962499
      },
      {
        lat: 39.712407,
        lng: -104.96164
      },
      {
        lat: 39.712208,
        lng: -104.961614
      },
      {
        lat: 39.711928,
        lng: -104.960074
      },
      {
        lat: 39.711672,
        lng: -104.959371
      },
      {
        lat: 39.711061,
        lng: -104.959398
      },
      {
        lat: 39.708424,
        lng: -104.959403
      },
      {
        lat: 39.704937,
        lng: -104.959419
      },
      {
        lat: 39.698106,
        lng: -104.959419
      },
      {
        lat: 39.687415,
        lng: -104.959484
      },
      {
        lat: 39.686342,
        lng: -104.959623
      },
      {
        lat: 39.684971,
        lng: -104.959623
      },
      {
        lat: 39.68498,
        lng: -104.960793
      },
      {
        lat: 39.685095,
        lng: -104.962027
      },
      {
        lat: 39.685364,
        lng: -104.963341
      },
      {
        lat: 39.685838,
        lng: -104.964666
      },
      {
        lat: 39.686986,
        lng: -104.967042
      },
      {
        lat: 39.688361,
        lng: -104.969928
      },
      {
        lat: 39.690074,
        lng: -104.973383
      },
      {
        lat: 39.694701,
        lng: -104.973367
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Washington Park begins just south of the Cherry Creek channel and bikeway and is located about two miles southeast of downtown Denver. From this point the neighborhood extends east for a rough distance of about six city block lengths and stretches all the way south to Interstate 25. One of Denver’s largest and most celebrated city parks occupies a good portion of this neighborhood and is an outstanding convenience for endorphin junkies and athletes. University of Denver is not too far away and has made the area a lodging destination for college professors and staff. About three miles southeast of the Washington Park neighborhood is the Denver Technological Center, which can be reached by either highway or light rail.",
    keyFeats: [
      "Washington Park",
      "Midway position between downtown Denver and Denver Technological Center",
      "Near University of Denver"
    ]
  },
  {
    id: "speer",
    name: "Speer",
    paths: [
      {
        lat: 39.725549,
        lng: -104.98684
      },
      {
        lat: 39.711222,
        lng: -104.986939
      },
      {
        lat: 39.711189,
        lng: -104.973496
      },
      {
        lat: 39.717899,
        lng: -104.973496
      },
      {
        lat: 39.719475,
        lng: -104.973345
      },
      {
        lat: 39.720259,
        lng: -104.973034
      },
      {
        lat: 39.725507,
        lng: -104.973077
      },
      {
        lat: 39.725549,
        lng: -104.98684
      }
    ],
    strokeWeight: 0,
    fillColor: "#f3765a",
    fillOpacity: 0.7,
    writeUp:
      "Often misclassified as being part of the adjacent Baker and Washington Park West neighborhoods, Speer is distinguished from the rest of the city by its recognition as being the city’s most popular neighborhoods for apartment renters. According to statistical data gathered by several housing search sites, Speer is the top target for apartment renters. Like Baker, this charming neighborhood is located along Denver’s South Broadway, or “SoBo,” shopping and nightlife district where a tremendous variety of eateries, clothing retailers, salons, bars, theaters, and nightclubs occupy a 14-block stretch of the Broadway/Lincoln Street corridor. Beautiful single family homes intermingle with smaller apartment communities to help bring balance to this area’s population density.",
    keyFeats: [
      "Close to high-frequency bus route providing quick access to downtown Denver",
      "Home to the South Broadway nightlife district",
      "Very large number of dining options within easy walk",
      "Very large presence of bars and nightlife venues",
      "Major shopping center located close by",
      "Close to Washington Park",
      "Near Cherry Creek regional bike trail"
    ]
  },
  {
    id: "cheesmanPark",
    name: "Cheesman Park",
    paths: [
      {
        lat: 39.739946,
        lng: -104.972916
      },
      {
        lat: 39.739905,
        lng: -104.959731
      },
      {
        lat: 39.740029,
        lng: -104.958915
      },
      {
        lat: 39.738717,
        lng: -104.958883
      },
      {
        lat: 39.738123,
        lng: -104.958722
      },
      {
        lat: 39.732793,
        lng: -104.958744
      },
      {
        lat: 39.73224,
        lng: -104.959119
      },
      {
        lat: 39.731605,
        lng: -104.959377
      },
      {
        lat: 39.730351,
        lng: -104.959291
      },
      {
        lat: 39.72913,
        lng: -104.959141
      },
      {
        lat: 39.725689,
        lng: -104.959087
      },
      {
        lat: 39.725672,
        lng: -104.966125
      },
      {
        lat: 39.725664,
        lng: -104.972852
      },
      {
        lat: 39.739946,
        lng: -104.972916
      }
    ],
    strokeWeight: 0,
    fillColor: "#4082ad",
    fillOpacity: 0.7,
    writeUp:
      "Hearing about the old haunts and legends of Cheesman Park can be an enchanting experience to nearly anyone, whether interested in history or not. The old-time ambiance of this neighborhood is easy to appreciate, thanks to the commonplace stone architecture, wrought-iron fences, elegant gardens, and century-old shade trees that dot the area. The centerpiece and crown jewel of this neighborhood is Cheesman Park itself, which offers runners and walkers a heavily-canopied, soft-surface running trail and an expansive sea of lush, green grass that makes for an exciting round of volleyball.",
    keyFeats: ["Cheesman Park", "Denver Botanic Gardens"]
  },
  {
    id: "washParkWest",
    name: "West Wash Park",
    paths: [
      {
        lat: 39.711082,
        lng: -104.986928
      },
      {
        lat: 39.711032,
        lng: -104.973485
      },
      {
        lat: 39.690206,
        lng: -104.973539
      },
      {
        lat: 39.690602,
        lng: -104.974375
      },
      {
        lat: 39.691081,
        lng: -104.975212
      },
      {
        lat: 39.691741,
        lng: -104.976124
      },
      {
        lat: 39.692484,
        lng: -104.976972
      },
      {
        lat: 39.695456,
        lng: -104.980266
      },
      {
        lat: 39.701136,
        lng: -104.98681
      },
      {
        lat: 39.711082,
        lng: -104.986928
      }
    ],
    strokeWeight: 0,
    fillColor: "#f5b71a",
    fillOpacity: 0.7,
    writeUp:
      "Positioned in southcentral Denver, Washington Park West is a trendy neighborhood with plenty of good vibes. Despite being four neighborhoods out from the Central Business District, this area tends to attract many urban professionals. Both a light rail line and Interstate 25 run along the southern edge offering direct, multi-modal access to downtown Denver and the Denver Technological Center, which are two of the Denver metropolitan area’s largest employment centers. Four different light rail stations are located either in or near the neighborhood. The athletically-inclined will appreciate living close to Washington Park itself, a local gem that draws people from all over the city with its 2.6-mile crushed-gravel running trail, eight tennis courts, year-round swimming pool, large recreation center, soccer fields, basketball courts, and volleyball pads. Due to its central location, many outdoor enthusiasts and personal wellness social-networking groups have also made Washington Park their usual rendezvous point. For post-recreational-meetup gatherings, many pubs and eateries are conveniently scattered throughout Washington Park West, with a large concentration of these establishments being located at the western limits of the neighborhood, where the southern portion of Denver’s South Broadway nightlife district is located. Also popular with the Washington Park regulars is the South Pearl Street business district, which features charming, main-street-style buildings.",
    keyFeats: [
      "Washington Park",
      "Light rail transit service",
      "South Pearl Street business district",
      "University of Denver",
      "Big box national retailers",
      "Whole Foods"
    ]
  },
  {
    id: "fivePoints",
    name: "Five Points",
    paths: [
      {
        lat: 39.769112,
        lng: -104.973474
      },
      {
        lat: 39.770168,
        lng: -104.9737
      },
      {
        lat: 39.770943,
        lng: -104.972916
      },
      {
        lat: 39.774835,
        lng: -104.977991
      },
      {
        lat: 39.767562,
        lng: -104.983795
      },
      {
        lat: 39.7671,
        lng: -104.983999
      },
      {
        lat: 39.765327,
        lng: -104.991005
      },
      {
        lat: 39.764733,
        lng: -104.992711
      },
      {
        lat: 39.763397,
        lng: -104.994696
      },
      {
        lat: 39.760667,
        lng: -104.994503
      },
      {
        lat: 39.760098,
        lng: -104.994256
      },
      {
        lat: 39.759389,
        lng: -104.993623
      },
      {
        lat: 39.756914,
        lng: -104.99034
      },
      {
        lat: 39.754432,
        lng: -104.9871
      },
      {
        lat: 39.747594,
        lng: -104.987261
      },
      {
        lat: 39.747594,
        lng: -104.978367
      },
      {
        lat: 39.743997,
        lng: -104.973506
      },
      {
        lat: 39.769112,
        lng: -104.973474
      }
    ],
    strokeWeight: 0,
    fillColor: "#72c6a1",
    fillOpacity: 0.7,
    writeUp:
      "Say hello to Denver’s oldest residential neighborhood. Five Points has a highly rich heritage that is made evident by its numerous stone mansions and 1880’s-era brick-construction commercial structures, many of which still bear marks of the distant past, such as their sun-worn three-story-tall painted wall advertisements, rooftop lighting rods, and wrought-iron fire escapes. Sadly, the name of this historic neighborhood is slowly falling into disuse, as many condominium developers have recently begun informally rebranding several areas of this neighborhood with contemporary-sounding designations. River North, or “RiNo”, is the name of an art district that occupies the western half of Five Points. Ballpark, a stadium and sports district, overlays the far southwest corner, while an urban infill district named Prospect abuts both Union Station and Highland on the far west end. A light rail transit line serves the eastern half of Five Points and runs along the main commercial strip of this neighborhood. Nomenclature concerns and new luxury condominiums developments aside, Five Points retains a robust sense of charm and antiquity thanks to the Welton Street nightlife corridor, which, at one point, had as many as 50 independent music theaters and taverns once frequented by a large list of famous jazz artists such as Duke Ellington, Miles Davis, Nat King Cole, and Dizzy Gillespie. With a close proximity to downtown Denver, this neighborhood also makes it an ideal location for those wishing to be near the central business district of the city.",
    keyFeats: [
      "Multiple light rail transit stations",
      "Commuter rail transit providing direct service to Denver International Airport",
      "Welton Street nightlife",
      "Close to downtown Denver"
    ]
  }
];

// transform data
const newFormat = old.map((neighborhood, index) => {
  var coordinates = neighborhood.paths.map(point => [point.lat, point.lng]);
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: coordinates
    },
    properties: {
      id: index,
      name: neighborhood.name,
      fillColor: neighborhood.fillColor,
      writeUp: neighborhood.writeUp,
      keyFeats: neighborhood.keyFeats
    }
  };
});

// write new data to file
fs.writeFile(
  "/Users/JuliaRichards/Hut/denver-maps/src/neighborhoods.json",
  JSON.stringify(newFormat),
  function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  }
);
