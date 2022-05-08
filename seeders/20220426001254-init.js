/* eslint-disable max-len */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('this happened');

    const adamData = {
      business_status: 'OPERATIONAL',
      geometry: { location: { lat: 1.3240414, lng: 103.8141545 }, viewport: { northeast: { lat: 1.325457280291502, lng: 103.8154568802915 }, southwest: { lat: 1.322759319708498, lng: 103.8127589197085 } } },
      name: 'Adam Road Food Centre',
      opening_hours: { open_now: true, periods: [{ close: { day: 1, time: '1800' }, open: { day: 1, time: '0800' } }, { close: { day: 2, time: '1800' }, open: { day: 2, time: '0800' } }, { close: { day: 3, time: '1800' }, open: { day: 3, time: '0800' } }, { close: { day: 4, time: '1800' }, open: { day: 4, time: '0800' } }, { close: { day: 5, time: '1800' }, open: { day: 5, time: '0800' } }], weekday_text: ['Monday: 8:00 AM – 6:00 PM', 'Tuesday: 8:00 AM – 6:00 PM', 'Wednesday: 8:00 AM – 6:00 PM', 'Thursday: 8:00 AM – 6:00 PM', 'Friday: 8:00 AM – 6:00 PM', 'Saturday: Closed', 'Sunday: Closed'] },
      photos: [{
        height: 3120, html_attributions: ['<a href="https://maps.google.com/maps/contrib/118185967040152307115">Tusnaeni Sahir</a>'], photo_reference: 'Aap_uEBIOeK2JwX7TMBe3vG3Fc7va2RUg3y1WeZHe3brFfO04RmzQZ47FQewZ5TbRKtoD6MYUMHh1qPfKfVHZHp_iFiQ8kB-UFJNJbhrigDr3nG0m_bQvlIbfDJU-NI7SU2zEIR-7lWiFnSX03J3aj9Fh5fbMDVhZHK42imdPMFq3BxRugnh', width: 4160,
      }, {
        height: 2250, html_attributions: ['<a href="https://maps.google.com/maps/contrib/101323946057340119778">Zhao Riji</a>'], photo_reference: 'Aap_uECJOUne-VQ6cGdsrXu6fmocCXgT3y5IupAWcflm0KNGLXx1dQOR8WaUFYvDNRYSfeTc1dBOp40HvW2tg-8cNoSScsVHkoVPqPHnr5mvKCCBiqPuNTQEZcqRKwtjJ8CMGDYvDzObXtZtzm9zFJX0CfDxEPXg10FUmVw7k_jrzfqnRByC', width: 4000,
      }, {
        height: 2252, html_attributions: ['<a href="https://maps.google.com/maps/contrib/103120626378642104559">Jerome Koh</a>'], photo_reference: 'Aap_uEATLE4jPaKhWZZfUKJ1QtGGUUv1WCfC5m7CF-Q1RapyAnOhuK8YJy9oP8BQkqDrTsZyBAW58ExJx7jZ7HNXwLcgLSCpB2mfCDOHihsEf9vJd_mNJFERCW-Poll_pzWNQy1xyRaLMoNDW4clL1Nha9cQ9fepDr8fsWKHDZ8KnRs09_bq', width: 4000,
      }, {
        height: 3000, html_attributions: ['<a href="https://maps.google.com/maps/contrib/104008302165754254960">Sing Lim</a>'], photo_reference: 'Aap_uECt5VShKRPI72bF_zchZq1zU2tpHbbol8WCtdo2E_05EG_MOpY1xyuhIZLeqAuuX86WVun38817Eea1QtZ1wpJeWbqaINm4Vf8C50hV1bkRbHSEUz-zfzZAkIXTpUTsXQ89YazTOZZtRsib45GbZ-QKZy_UKfKn-E7y_0lqdrDijZrJ', width: 4000,
      }, {
        height: 1200, html_attributions: ['<a href="https://maps.google.com/maps/contrib/104351126336250039974">Old F. Art</a>'], photo_reference: 'Aap_uEA-KQ-It3FxNzTNvJXay5Bzk5qpurKmYhaAgnXsqxudhDRL8GLzLPfdSt1O88Zf7nRRdo484J6mJkF1CtyJsw0CcYZe8RLY-fAtAs9nWNrqI13Wh-aRofZu-eLBjva2pLFcIn_-xOA7640tQaTJzC1c92_vT5e8Ql2KMWFQu0mxfty0', width: 1600,
      }, {
        height: 2736, html_attributions: ['<a href="https://maps.google.com/maps/contrib/116678199091086593394">pehtitus</a>'], photo_reference: 'Aap_uEA99oBTH-MJ7OTdxEZgf3CckKO3LD21qKM8ikeSyQmM_eOJmd2Sj-6Y3Bu9p_qkgJ_iTFZt9DuA2SMbMacgxcZ6TSs8YTG2m30Gv41-9ISP60qKIu4S-iTO4hKexABmEqvj46zCtG_xnbKHF1njBfwcjMrPRromIMOgbsg07_l2zzh3', width: 3648,
      }, {
        height: 3472, html_attributions: ['<a href="https://maps.google.com/maps/contrib/106318638458691971644">Parry Chong</a>'], photo_reference: 'Aap_uEBLKqmpR9Kw48Qg1HKh3CTtrtv8djLXybjTd9k1IgiZHmj8uALHLA55DtcD2U1qDkW0NEAMbbovc9feKj5W2k8tKYf5aBqHnM-GwP6zG6eQ013jlFrZcQKas1-OCPytuphDL-0mlKpCYvMiMhMRj0JlITEkPuswGz8VCQTMMD7QqNj-', width: 4624,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/105013457874641873091">Martin Quek</a>'], photo_reference: 'Aap_uEBNcnf8Lh97S2uZmFz-SK5Ec4ArfKah0oDxdeQSZFRq2dj1UdrCnQWh-ZxErJw5tAxr_789Cw6QBlYTrT8JtnZE0hvPV15PKW9s9_eRBRiG3jVq4RenhpMii1VoMRzdpETAptI7pFA6DkiO00EXjRVhxxR2QhCYG7Rv40zciddNcBdG', width: 4032,
      }, {
        height: 2736, html_attributions: ['<a href="https://maps.google.com/maps/contrib/116041360736905930368">Ahmad Shahir</a>'], photo_reference: 'Aap_uEDbi__Ybsq_E_7YZmPC5_JykOD4h3n_GqvB0AE-69gNhJcFCtN9PTAH7F7Ylq6Vq9UfbCCnw6wFJ3VanumdozynNzYAinYLDvbj6zQcDVI4xDXAs1rR27W0T5iTpbqSPz2Fd9aohv2J8VQUpqRikCSxOSzLqBYYMZ80n7Mlv93B8L3J', width: 3648,
      }, {
        height: 1960, html_attributions: ['<a href="https://maps.google.com/maps/contrib/101394802138039483309">KENT CHUA</a>'], photo_reference: 'Aap_uEBdPLY16-0PzzYT29ly2pV7v6jpVRBjWTcFNn4Q_SQJc2jrOiVwmCF--T23vChNhVJOIam9pP3_s-bG-a05dJjqoKH9HZcRDc3boP8CafArlByUgUk3xo8az9yym7NCMTHcImbm7KzR-H5-d2UiqLB5yTgc2M1HxFQWXl5RThWkhplT', width: 4032,
      }],
      rating: 4.1,
    };

    const macsData = {
      business_status: 'OPERATIONAL',
      formatted_phone_number: '6779 1413',
      geometry: { location: { lat: 1.2975443, lng: 103.7633584 }, viewport: { northeast: { lat: 1.298957280291502, lng: 103.7647456302915 }, southwest: { lat: 1.296259319708498, lng: 103.7620476697085 } } },
      name: "McDonald's West Coast Park",
      opening_hours: { open_now: true, periods: [{ close: { day: 1, time: '0200' }, open: { day: 0, time: '0600' } }, { close: { day: 2, time: '0200' }, open: { day: 1, time: '0600' } }, { close: { day: 3, time: '0200' }, open: { day: 2, time: '0600' } }, { close: { day: 4, time: '0200' }, open: { day: 3, time: '0600' } }, { close: { day: 0, time: '0000' }, open: { day: 4, time: '0600' } }], weekday_text: ['Monday: 6:00 AM – 2:00 AM', 'Tuesday: 6:00 AM – 2:00 AM', 'Wednesday: 6:00 AM – 2:00 AM', 'Thursday: 6:00 AM – 12:00 AM', 'Friday: Open 24 hours', 'Saturday: Open 24 hours', 'Sunday: 6:00 AM – 2:00 AM'] },
      photos: [{
        height: 6936, html_attributions: ['<a href="https://maps.google.com/maps/contrib/109845981260181580873">Vincent Khoo</a>'], photo_reference: 'Aap_uEDLDI3EbrxynjBRrxRa7-cSx9PnUgGFVhnIJz2PDgVtivOcbo4QW3ZsbjQjTQDzICh6PNUMf9pRpV81bNn88Zs55-E6AI2vJe1IqnF8TCoikOasqx5XLS0wbxlW7JnYVXgLG1CunzDunNhRO4kT2AiBNRiVIwtkzj5EnBIWo0b3DKri', width: 9248,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/117782437474545961841">Louis Chua</a>'], photo_reference: 'Aap_uEB451xQXna14lx2AKre7-fcIg-9LvCtgrFzKTHg9SgJkCzIp5lyZJ7uEphKGRMN9tWL4xiRv-AC2H_HVcVgBu2lCRIhVvIYb3ib3yaaICeOvCjhhw6ro5oDi7EJQy_HBIFiwkkqt0gJcJetEyHRRJYUBfzs7nTASim6dt24YATpdhr0', width: 4032,
      }, {
        height: 3000, html_attributions: ['<a href="https://maps.google.com/maps/contrib/101905033524146898852">Vikas</a>'], photo_reference: 'Aap_uECYF8pzr3dxqIDanmUlPn7Mbji8WaKL8vapb7v92Gsae5-MW6RbCEKI31Uvg3nFLzBFHpDgHf4Ca0UCCRaQYiMjMux3QFqhagP6-02c0ow1-_EPU1P9reAjQ5n9wQwUj-KLPvlBLpCBjxa_42wbeYilGN0kqa_YHUhj5691OPVrD2k4', width: 4000,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/104029890742105166693">Zit Seng Lai</a>'], photo_reference: 'Aap_uEAiY5vNt1nt1-MhxBi7yoC4IfAOuLqTHDT4xtwcsc6j6sRM7pz4VzxqNkL3fiR-pyKCMrBVp71M95KFl0ziIFOvg6B0XVyOPJ0HuZkxFt1Nw1oOvgvi3gNYcLD3GbLGnqIyYSJCCD2QNaEFD5e3-SK7kO1KfqbL7VHMlf1cFM-XHL1G', width: 4032,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/117782437474545961841">Louis Chua</a>'], photo_reference: 'Aap_uEAFBJJycDuZgsBt-X-Qr9L7P5pfNg4w6tE-5bc5MJe6if2st5_ACEFL6A-3FSAHWxmcDBl7A2uDsVcg0a_DDdxJusFxN0vxocQiivLaOgXfNRt6UklAS220e2GSjjZvgEhmv4catHpya8jgvTcqT-OC9ZyXQ2aSwVERRqyKIL-3VYNd', width: 4032,
      }, {
        height: 3000, html_attributions: ['<a href="https://maps.google.com/maps/contrib/101905033524146898852">Vikas</a>'], photo_reference: 'Aap_uEAwABdyb1aUQlifU46f7-W_d8YhEMnEUYKy1lTDZxwFxQnZfoP_pw8MhSEuXONKY01MBNx9miwRHaljePoEAPXq1eqoV89lJsoumdtsyE2FneiPX8VfKJxSy4kSpTyzXJQFq3omAme4b-MY4Q9B8W8KHhKFqG0vyF9t7Mxiflfpy-xz', width: 4000,
      }, {
        height: 1920, html_attributions: ['<a href="https://maps.google.com/maps/contrib/113728795396627074844">Ariful Islam</a>'], photo_reference: 'Aap_uEBjme6qwGI4n4EA19jv42Qc3dI4aXBCW30NT10X12KYiHlFJCeHjvIb02TU_qzC9EzPwDfYd7DkoNqzO3ajVUZNpp969Vsc9szuP9oAmN1gx7KSV66c916qXX6FlG8p-aBfAitFjyJ2Q642PWIHaEr7coj_L0gMok9fplF0b3asJPpy', width: 2560,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/100774134037119189055">HAIYANG ZHAO</a>'], photo_reference: 'Aap_uEAUs44bmPGwVbh4WZvIerlEyeSzwMLtU9xduKSmtDzAlA1pa3pXjz7PiY_BQYLDO-qr3NfGNmnxYJqcgyj2sNnbzYIBODbcIHmpMNgprNcZU1Wl-FX8toMZOi4uX4sze9yPCKTfrnehqxVCfFNlMf8Ge5HHX0eTv80Vz-eHnDj9fGxL', width: 4032,
      }, {
        height: 1080, html_attributions: ['<a href="https://maps.google.com/maps/contrib/117964784377863187974">Sebastian Lim</a>'], photo_reference: 'Aap_uED0V-aJtuGkN9GD4rWPF7TQEtI6CJmkpKfniCRcmZEqwpG4kcIscnuyu-2WHuDd_iIgxRfWDSQpRF5pLoI5KX-N-eeTa-_0X5JLq7ZhUpbpBxam5VZC8f0WAVyzQWZnoY80WgWDO8ebaFWmtFpsMarnctgCJzEX87uywbsmLmRyVXIt', width: 1920,
      }, {
        height: 3024, html_attributions: ['<a href="https://maps.google.com/maps/contrib/112423934387221680562">Chua Chuen Loy, Jackie</a>'], photo_reference: 'Aap_uECVV94B5f7sCyVrvCGbowKsLRcU-fSyMQjmnQPUcYbtXlzBp2rJvUycEkW6f1V3gg1AFuoVwCWOLf2i7tmvKWUS9DJyAd7QknRYN3j-FAGLWIfQmXe5TKxO-b6xheK-WPW6Uri_FTEwl5GKxE7adu76OkSSqMKW7DUgx8hnSB8hImTW', width: 4032,
      }],
      rating: 4.3,
    };

    const seedRestaurants = [
      {
        name: '69 some road, test-restaurant, singapore',
        address: '69 some road',
        visited_count: 5,
        place_data: JSON.stringify(adamData),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '420 other road, test-restaurant2, singapore',
        address: '420 other road',
        visited_count: 0,
        place_data: JSON.stringify(adamData),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Adam Road, Adam Road Food Centre, Singapore',
        address: '2 Adam Rd, Singapore 289876',
        visited_count: 12,
        place_data: JSON.stringify(adamData),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'West Coast Highway, McDonald\'s West Coast Park, Singapore',
        address: '71 W Coast Hwy, Singapore 126844',
        visited_count: 12,
        place_data: JSON.stringify(macsData),
        created_at: new Date(),
        updated_at: new Date(),
      }];

    await queryInterface.bulkInsert('restaurants', seedRestaurants);

    const seedUsers = [
      {
        username: 'gordon_ramsay',
        password: '9ab15bec3f9d2f9f3bb9c651c6a27ce5df06b5d9936b2016d6f23c8d45c13b016b2dbb6ac9d412f59eb7d1c40ed5b637b52fab0806839325ead003b7873c4cc0',
        email: 'a',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'colonel_sanders',
        password: 'd1f455971cb56a34331e80848b839f55aff94be2753b4fa2fb3a15e530fb75f45bbd374966c8cb174ba08d980689e594ae5977ba7518c346ee31f6cfc660c281',
        email: 'b',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'caifan_auntie',
        password: 'b5f9644e031142a1c75358a47224d5919a4aef0dc03ff4dfe7de8db7902fb7d64a6e9e6eaf5429a77b2a2a02025d83c9bc000f6990d950ff24a8d8c621ea51f4',
        email: 'c',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', seedUsers);

    const seedReviews = [
      {
        restaurant_id: 2,
        user_id: 1,
        title: 'AmAzIng :O',
        review: 'Wow that was so good, gr8 stuff bro. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 2,
        title: 'This place STINKS',
        review: 'Such a bummer, I was so excited for it too! I woke up, brushed my teeth for a solid ten minutes, then rushed over. Here\'s the thing: everything at this McDonald\'s TASTES. LIKE. TOOTHPASTE. The fries, the burger, even the sodey pop! I don\'t know how they did it. I said to the manager, \'Yo, my man... why does my food taste like toothpaste?\' He apologized to me and gave me a new meal. Guess what? THAT MEAL TASTED LIKE TOOTHPASTE TOO. One star.',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 3,
        title: 'food poisoning',
        review: 'A few hours after that, I started vomiting, and it\'s been about 8 hours since I first started and I\'ve puked out all the contents of my stomach, even though the most recent time is was nothing but stomach acid and water until I was dry heaving. This IS NOT typical for me, and I can count on one hand how many times I\'ve gotten food poisoning, so I am just tremendously disappointed. You will not see me as a patron there again.',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 1,
        user_id: 1,
        title: 'spam',
        review: 'reviews reviews reviews reviews reviews reviews',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 1,
        user_id: 1,
        title: 'spam',
        review: 'reviews reviews reviews reviews reviews reviews',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 1,
        user_id: 1,
        title: 'spam',
        review: 'reviews reviews reviews reviews reviews reviews',
        likes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },

    ];

    await queryInterface.bulkInsert('reviews', seedReviews);

    const seedMessages = [
      {
        restaurant_id: 3,
        user_id: 2,
        likes: 0,
        message: 'Anybody around? I wanna eat nasi lemak',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 3,
        user_id: 3,
        likes: 6,
        message: 'Queued up for 1hr bro, want me to dabao for you?',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 1,
        likes: 6,
        message: 'Hello, how\'s the crowd at macs?',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 3,
        likes: 420,
        message: 'very crowded',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 1,
        likes: 0,
        message: 'can help me to buy first pls??',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 4,
        user_id: 3,
        likes: 69,
        message: 'shuai ge, chi/dabao?',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('messages', seedMessages);

    const seedRewards = [
      {
        name: 'SUPerb Helper',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'SUPer Explorer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Reviewer SUPreme',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('rewards', seedRewards);

    const seedUserRewards = [
      {
        user_id: 3,
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('user_rewards', seedUserRewards);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('restaurants');
    await queryInterface.bulkDelete('users');
  },
};
