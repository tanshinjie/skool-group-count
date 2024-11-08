console.log("Content script initialised.");

async function getBuildId() {
  const buildId = fetch("https://www.skool.com/discovery").then((response) => response.text()).then((text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const pagePropsStr = doc.getElementById("__NEXT_DATA__").innerText;
    const pageProps = JSON.parse(pagePropsStr);
    return pageProps.buildId;
  });
  return buildId;
}

async function main() {
  console.log("[Skool Group Count] main");
  const buildId = await getBuildId();
  console.log("buildId", buildId);

  const pagePropsList = raw.pageProps.categories
    .map((category) =>
      fetch(
        `https://www.skool.com/_next/data/${buildId}/discovery.json?c=${category.id}`
      )
    );

  Promise.all(pagePropsList)
    .then((responses) => {
      return Promise.all(responses.map((response) => response.json()));
    })
    .then((jsons) => {
      jsons.forEach((json) => {
        const el = document.getElementById(
          `chip-filter-chip-${json.pageProps.categoryParam}`
        );
        el.innerText += ` (${json.pageProps.numGroups})`;
      });
    });
}

// Add this event listener at the end of content.js
chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in content script", request);
  if (request.toggle) {
    main();
  }
});

// JSON content of the `https://www.skool.com/_next/data/1731016696695/discovery.json?c=${category.id}` as of 2024-11-08
const raw = {
  pageProps: {
    settings: {
      pageTitle: "Skool: Discover Communities or Create Your Own",
      pageMeta: {
        description:
          "Skool is a community platform. You can discover communities or create your own. Some are free, some paid. People earn full-time incomes building on Skool. You can, too!",
        title: "Skool: Discover Communities or Create Your Own",
        image:
          "https://assets.skool.com/skool/3824c26a881e434fb0710f1c257ef501.png",
        touchIcon:
          "https://assets.skool.com/skool/8d5e2d4df1b645148f07ae0d9df14c51.png",
      },
    },
    page: 2,
    channelId: "",
    groups: [
      {
        group: {
          id: "0a06a296f7cd4d28b5da867098733415",
          name: "creatoraccelerator",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/0a06a296f7cd4d28b5da867098733415/39b30a722b0c4996a8d59f13f22e7c51a36a67fee3574715915ead5b76f34868-md.jpg",
            description:
              "Partner With Your First Content Creator And Then Turn Their Followers Into A $10k/mo Skool Community In 14 days\n\nsupport@growthoperator.com",
            displayName: "Creator Accelerator ",
            initials: "CC",
            logoUrl:
              "https://assets.skool.com/f/0a06a296f7cd4d28b5da867098733415/461d063ea8c846b685eaac77449cf2ba3d9a252bf9804f279915021b734d9318",
            lpAccessType: 2,
            totalMembers: 1948,
          },
          createdAt: "2023-05-23T23:15:12.145511Z",
          updatedAt: "2024-11-08T12:17:09.225368Z",
        },
        rank: 139,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 31,
      },
      {
        group: {
          id: "0a0ed0dd60dc4702a95e75943c2d5b07",
          name: "3ccc",
          metadata: {
            color: "#EB6E00",
            coverSmallUrl:
              "https://assets.skool.com/f/0a0ed0dd60dc4702a95e75943c2d5b07/d0a4191e46604059851db9ff276278d0f8f9fd762cd14e70b2aa70f282c3ae13-md.jpg",
            description:
              "Deine Skool Community 𝙉𝘼𝘾𝙃𝙃𝘼𝙇𝙏𝙄𝙂 + 𝙋𝙍𝙊𝙁𝙄𝙏𝘼𝘽𝙀𝙇 aufbauen  🆓  ❱❱ 💰 ❱❱ 💰💰 𝘦𝘷𝘦𝘳𝘺𝘵𝘩𝘪𝘯𝘨 𝘸𝘪𝘵𝘩 🧡",
            displayName: "Community Creators Collective",
            initials: "3C",
            logoUrl:
              "https://assets.skool.com/f/0a0ed0dd60dc4702a95e75943c2d5b07/f9a743b4e54343e59793743453a1f9d0fdce87caa5ea413eb6cfe8fdd4e6a4c9",
            totalMembers: 267,
          },
          createdAt: "2024-03-16T01:23:42.977207Z",
          updatedAt: "2024-11-08T12:23:44.217587Z",
        },
        rank: 140,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 32,
      },
      {
        group: {
          id: "e271f1db8d0045e6962d5f420bab70c5",
          name: "the-ghost-family-1230",
          metadata: {
            color: "#767676",
            coverSmallUrl:
              "https://assets.skool.com/f/e271f1db8d0045e6962d5f420bab70c5/ab1355dc7cb047a49e28e28b146d069498f7edd6eca3475f8cb970c78beef87f-md.jpg",
            currentMBp: '{"currency":"usd","amount":4500}',
            description:
              "TGF, where we guide you through a journey to help you monetize your social media and assist you in constructing a successful 6-7-figure business.\n\n\n\n\n",
            displayName: "The Ghost Family",
            initials: "TG",
            logoUrl:
              "https://assets.skool.com/f/e271f1db8d0045e6962d5f420bab70c5/151c745c1a464769839d9de68efab4e64299e4b0577a492095d7399c83161798",
            lpAccessType: 1,
            totalMembers: 354,
          },
          createdAt: "2024-01-27T01:08:42.829406Z",
          updatedAt: "2024-11-08T11:14:15.573781Z",
        },
        rank: 141,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 33,
      },
      {
        group: {
          id: "381b2eecca5442df85c8ab8c6a264d8c",
          name: "agencyowners",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/381b2eecca5442df85c8ab8c6a264d8c/8e9288318e75445ca6ec11ec375edc300f42beaabdc242bf835f8fef595e996a-md.jpg",
            description:
              "Master your environment by surrounding yourself with other agency owners. \n",
            displayName: "Agency Owners",
            initials: "AO",
            logoUrl:
              "https://assets.skool.com/f/381b2eecca5442df85c8ab8c6a264d8c/bc348b04b9f1422e8c0bc8e43b48833657e9864ad5b849fc8f9e9ada18e1d6c3",
            lpAccessType: 1,
            totalMembers: 5881,
          },
          createdAt: "2023-06-13T16:04:54.797936Z",
          updatedAt: "2024-11-08T12:14:36.1163Z",
        },
        rank: 145,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 34,
      },
      {
        group: {
          id: "d61a830f7d4c4c2ab0930907061024d9",
          name: "super-affiliate-academy",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/d61a830f7d4c4c2ab0930907061024d9/fc40b91456bd4a9cab102671e219cacf8ca7c6c81d224e5abc63a3c6494b7d2c-md.jpg",
            description:
              "Become a super affiliate and get paid to never create products.  Affiliate Marketers you have found your paradise. ",
            displayName: "Super Affiliate Academy (FREE)",
            initials: "SA",
            logoUrl:
              "https://assets.skool.com/f/d61a830f7d4c4c2ab0930907061024d9/6b8842dd70e54d3f8753495d50c066b49716fbc1ef08403a94f57fbdc29e12cc",
            totalMembers: 3937,
          },
          createdAt: "2024-04-25T12:54:57.282145Z",
          updatedAt: "2024-11-08T12:17:32.863583Z",
        },
        rank: 151,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 35,
      },
      {
        group: {
          id: "9e05c6f8cf4946c498071de051360b60",
          name: "the-1percent-club",
          metadata: {
            color: "#000000",
            coverSmallUrl:
              "https://assets.skool.com/f/9e05c6f8cf4946c498071de051360b60/c911c3af33b24dee8c14f7312753b0c1eacf71f6215f4b738f56eb503dac4371-md.jpg",
            description:
              "Join the top 1% through real business education, self improvement & community.",
            displayName: "The 1% Club",
            initials: "T1",
            logoUrl:
              "https://assets.skool.com/f/9e05c6f8cf4946c498071de051360b60/27b057f46fde44cd803d36e31a9c1bdbe1b8fff850ec47deb9b7742e95b780a2",
            totalMembers: 3508,
          },
          createdAt: "2024-02-25T07:20:52.51954Z",
          updatedAt: "2024-11-08T12:17:32.180946Z",
        },
        rank: 155,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 36,
      },
      {
        group: {
          id: "2bf1751720144692a1789af91fbadcab",
          name: "elite-power-community-9108",
          metadata: {
            color: "#DF1A1A",
            coverSmallUrl:
              "https://assets.skool.com/f/2bf1751720144692a1789af91fbadcab/91e08b6a18c5405e943f939194ece030f56f72eb228b4c308e4caab5ef87f45b-md.jpg",
            currentMBp: '{"currency":"usd","amount":2500}',
            description:
              "A community of like-minded people and inspiring entrepreneurs learning how to make money online, leveraging Social Media & Affiliate Marketing.",
            displayName: "Elite Power Community",
            initials: "EP",
            logoUrl:
              "https://assets.skool.com/f/2bf1751720144692a1789af91fbadcab/7b8f319814a84d59a802b2aa17e1583d4df46c8fe2b04a9f8ad83977447f669e",
            totalMembers: 771,
          },
          createdAt: "2024-07-08T19:29:20.018166Z",
          updatedAt: "2024-11-08T12:16:06.534386Z",
        },
        rank: 157,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 37,
      },
      {
        group: {
          id: "4e2d7072007543158ce67f6b41e92113",
          name: "schoolofmentors",
          metadata: {
            color: "#DF1A1A",
            coverSmallUrl:
              "https://assets.skool.com/f/4e2d7072007543158ce67f6b41e92113/79440ed92d764136af745af9b4ae41041df2800b804045a89ef63f28494c810b-md.jpg",
            currentABp: '{"currency":"usd","amount":33300}',
            currentMBp: '{"currency":"usd","amount":3700}',
            description:
              "What if you could get mentored by the greatest MILLIONAIRE and even BILLIONAIRE entrepreneurs that we interview?",
            displayName: "School of Mentors",
            initials: "HK",
            logoUrl:
              "https://assets.skool.com/f/4e2d7072007543158ce67f6b41e92113/d7986432697d409193fe7732f450a73cae19fb1e30d14960b56253e5d5db69ee",
            totalMembers: 1664,
          },
          createdAt: "2024-05-15T20:40:04.346572Z",
          updatedAt: "2024-11-08T12:17:52.944433Z",
        },
        rank: 168,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 38,
      },
      {
        group: {
          id: "b126b34f8241476f8b648a8b5387a168",
          name: "6fb",
          metadata: {
            color: "#009E5D",
            coverSmallUrl:
              "https://assets.skool.com/f/b126b34f8241476f8b648a8b5387a168/3146560069de41438daaa51b4a57b9a6d93d1629cacd449aa323334346054bac-md.jpg",
            description:
              "The 6FB Mentorship equips you with the skills, network, and strategies to elevate your career and secure financial freedom!",
            displayName: "6 Figure Barber Mentorship",
            initials: "6F",
            logoUrl:
              "https://assets.skool.com/f/b126b34f8241476f8b648a8b5387a168/6533783f02a9494bb4bfef905868172fbe5d15af4b744838aacc457064d60512",
            lpAccessType: 2,
            totalMembers: 1232,
          },
          createdAt: "2024-08-27T17:43:15.83167Z",
          updatedAt: "2024-11-08T12:14:32.77357Z",
        },
        rank: 169,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 39,
      },
      {
        group: {
          id: "68ec6c9d8c574dddbb6e8f5cbaac37ee",
          name: "synthesizer",
          metadata: {
            color: "#2929FF",
            coverSmallUrl:
              "https://assets.skool.com/f/68ec6c9d8c574dddbb6e8f5cbaac37ee/3e12fd38eb734ec2b8b452448356e512141cc280e54d4e14aa2e3b2ca668d1af-md.jpg",
            description:
              "Helping educational creators get paid to change the world.",
            displayName: "Synthesizer",
            initials: "SY",
            logoUrl:
              "https://assets.skool.com/f/68ec6c9d8c574dddbb6e8f5cbaac37ee/5785b62293fd432daecc5c94aee6211b2792844325bc4731bb74a3a5b8acf2ee",
            lpAccessType: 1,
            totalMembers: 13951,
          },
          createdAt: "2021-08-10T15:39:54.067523Z",
          updatedAt: "2024-11-08T12:16:48.124381Z",
        },
        rank: 172,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 40,
      },
      {
        group: {
          id: "6fcc7aac6db641c4b2ffe70edb80d6f6",
          name: "women-helping-women-mastermind-9715",
          metadata: {
            color: "#F75B9D",
            coverSmallUrl:
              "https://assets.skool.com/f/6fcc7aac6db641c4b2ffe70edb80d6f6/b9847dbf17ea40978c1745a09bba39d0a38bb8091b654672a9cee774510179b5-md.jpg",
            description:
              "Women Helping Women Mastermind is a community for Women Entrepreneurs to mastermind, network, collaborate and learn how to grow their businesses.",
            displayName: "Women Helping Women Mastermind",
            initials: "WH",
            logoUrl:
              "https://assets.skool.com/f/6fcc7aac6db641c4b2ffe70edb80d6f6/08003ee6365143a18ccdeacd755597e93bc44ba10fb94db6b4ef19e0119b751f",
            totalMembers: 5652,
          },
          createdAt: "2024-06-29T23:46:38.807937Z",
          updatedAt: "2024-11-08T12:17:10.108853Z",
        },
        rank: 176,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 41,
      },
      {
        group: {
          id: "cf6d62948de04aeda815c6c751dabe5b",
          name: "appointment-setting-community",
          metadata: {
            color: "#DF1A1A",
            coverSmallUrl:
              "https://assets.skool.com/f/cf6d62948de04aeda815c6c751dabe5b/d6cf7a045d0049fe8fca449e439e67877fa5637e114c4f00b8239b5009fb9933-md.jpg",
            description:
              "(Biz Owners, Looking for top 1% Setters/VAs? DM admin)\n\nThis group is for setters to connect & learn! We train & place the best setters on the market",
            displayName: "Appointment Setting",
            initials: "AS",
            logoUrl:
              "https://assets.skool.com/f/cf6d62948de04aeda815c6c751dabe5b/b0785cf1b3d840b6a05f59c30b70dc6ff0cba188dafa42d297e8c98d9d88575a",
            lpAccessType: 2,
            totalMembers: 1561,
          },
          createdAt: "2024-04-23T13:18:52.304277Z",
          updatedAt: "2024-11-08T12:16:42.512104Z",
        },
        rank: 181,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 42,
      },
      {
        group: {
          id: "660f5f09c76447568645da5639dd48eb",
          name: "digitalceos",
          metadata: {
            color: "#E4A511",
            coverSmallUrl:
              "https://assets.skool.com/f/660f5f09c76447568645da5639dd48eb/c9f2125247724eaebdf406f80c3cdfe9dcafc3e43baa4c7a85f31cd57d5932d5-md.jpg",
            description:
              "You won’t find any outdated degrees or meaningless trophies here. We provide you with real business skills for the digital age. Strap On Your Boots!",
            displayName: "Digital CEOs",
            initials: "DC",
            logoUrl:
              "https://assets.skool.com/f/660f5f09c76447568645da5639dd48eb/17f7333fb2d4425a80bd19f0ee70224e01bd4cc34d204421a99e9088a09fad95",
            lpAccessType: 2,
            totalMembers: 4329,
          },
          createdAt: "2023-02-28T01:05:34.671315Z",
          updatedAt: "2024-11-08T12:17:07.811858Z",
        },
        rank: 187,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 43,
      },
      {
        group: {
          id: "26d7216cf4aa4f99bdbd90f8a69c2a38",
          name: "the-founders-club",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/26d7216cf4aa4f99bdbd90f8a69c2a38/22b8d8af849a4b45b479c48d204c8f5ae141396558a44da5bf1d8fc3530f3f34-md.jpg",
            description:
              "The ultimate community for people looking to earn a full-time income from home just typing messages on their phone",
            displayName: "The Founders Club",
            initials: "TF",
            logoUrl:
              "https://assets.skool.com/f/26d7216cf4aa4f99bdbd90f8a69c2a38/9881e3cde56f47238be50166354a56e35c1fda6921a74a65b5746be55c9edf9a",
            totalMembers: 37339,
          },
          createdAt: "2023-10-04T17:40:35.266701Z",
          updatedAt: "2024-11-08T12:17:29.998834Z",
        },
        rank: 196,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 44,
      },
      {
        group: {
          id: "ebf7e91361e04d26a863164898b5522c",
          name: "djk",
          metadata: {
            color: "#DF1A1A",
            coverSmallUrl:
              "https://assets.skool.com/f/ebf7e91361e04d26a863164898b5522c/05644e7b2c144150882cf186da04436f60f9d9c665a1418d8c5529efb902ddc7-md.jpg",
            description:
              "Learn how to fire your boss and start a $10,000/month business part-time.",
            displayName: "Day Job Killer Mastermind ",
            initials: "DK",
            logoUrl:
              "https://assets.skool.com/f/ebf7e91361e04d26a863164898b5522c/efbd74724f964b01b8c8908dab4e61d6462e364570814207925f23738406d3e4",
            lpAccessType: 1,
            totalMembers: 5247,
          },
          createdAt: "2024-09-22T02:19:09.771277Z",
          updatedAt: "2024-11-08T12:17:20.470681Z",
        },
        rank: 200,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 45,
      },
      {
        group: {
          id: "66787df20bca46bd91ab32875aae1b8a",
          name: "queenbiz",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/66787df20bca46bd91ab32875aae1b8a/d56710391b434205a8b53402e4e63968d6727f5e77884cf4bce7414dc032fa44-md.jpg",
            currentMBp: '{"currency":"usd","amount":5400}',
            description:
              "✨ Rejoins une communauté de femmes ambitieuses prêtes à gagner de l'argent en ligne tout en profitant de leur vie et en s'entraidant vers la réussite.",
            displayName: "QueenBiz",
            initials: "SN",
            logoUrl:
              "https://assets.skool.com/f/66787df20bca46bd91ab32875aae1b8a/4c4c19a1456d43c1843d643d637f216c3859ed9596564ff694679852a41ee107",
            lpAccessType: 2,
            totalMembers: 145,
          },
          createdAt: "2024-08-15T12:45:37.723366Z",
          updatedAt: "2024-11-08T12:21:06.79675Z",
        },
        rank: 203,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 46,
      },
      {
        group: {
          id: "14ebfab7677842298a1521527ffdd0fb",
          name: "digitalfreedommentorship",
          metadata: {
            color: "#009E5D",
            coverSmallUrl:
              "https://assets.skool.com/f/14ebfab7677842298a1521527ffdd0fb/c19735cec99f439ea2ec5efe3846941e2d91a1e4764c4e1e89ebac8c2d7b3959-md.jpg",
            currentMBp: '{"currency":"usd","amount":10000}',
            description:
              "The last mentorship you'll ever need, that will show you step-by-step how to create a successful online digital product business. ",
            displayName: "Digital Freedom Accelerator™",
            initials: "HP",
            logoUrl:
              "https://assets.skool.com/f/14ebfab7677842298a1521527ffdd0fb/aa5a8eac5ada4234918014e84b4faa15b97b686dd0b148df90e70e170bf2184d",
            totalMembers: 773,
          },
          createdAt: "2024-02-20T14:27:20.558489Z",
          updatedAt: "2024-11-08T12:17:24.256035Z",
        },
        rank: 208,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 47,
      },
      {
        group: {
          id: "e256cd9ef1ac4dbe9197634db46e9e3b",
          name: "makerschool",
          metadata: {
            color: "#0F0F0F",
            coverSmallUrl:
              "https://assets.skool.com/f/e256cd9ef1ac4dbe9197634db46e9e3b/b9f477a8e299468caf859cb312a100432590cf7841b241c8aac84f45370218b6-md.jpg",
            currentABp: '{"currency":"usd","amount":66000}',
            currentMBp: '{"currency":"usd","amount":6600}',
            description:
              "The straightest-line path to getting your first automation customer. Price increases every 10 members.",
            displayName: "Maker School",
            initials: "MS",
            logoUrl:
              "https://assets.skool.com/f/e256cd9ef1ac4dbe9197634db46e9e3b/a6c0d285b72c4f91ba138703ad4f5a4f10a1ca89756d4276abf5c7ff3e3065a3",
            totalMembers: 788,
          },
          createdAt: "2024-09-05T20:09:16.650875Z",
          updatedAt: "2024-11-08T12:16:49.451572Z",
        },
        rank: 212,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 48,
      },
      {
        group: {
          id: "608fbcc2b69646a7b94ad26cbc886094",
          name: "thebreakerscreatoracademy",
          metadata: {
            color: "#ED1C24",
            coverSmallUrl:
              "https://assets.skool.com/f/608fbcc2b69646a7b94ad26cbc886094/8a740b5dd9404e5eb1a1dc4b28b83316d8695c0dcaa44d1487b8aa7a7755321d-md.jpg",
            currentABp: '{"currency":"usd","amount":28800}',
            currentMBp: '{"currency":"usd","amount":3000}',
            description:
              "A community of like-minded creators making a Kingdom impact!",
            displayName: "The Breakers Creator Academy",
            initials: "CA",
            logoUrl:
              "https://assets.skool.com/f/608fbcc2b69646a7b94ad26cbc886094/3806c76aca3b42da94a4447f5391a0c1d7440223b5664076809d5b2accdf6ea0",
            lpAccessType: 2,
            totalMembers: 341,
          },
          createdAt: "2024-04-23T19:29:09.332352Z",
          updatedAt: "2024-11-08T12:06:02.386613Z",
        },
        rank: 213,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 49,
      },
      {
        group: {
          id: "312afbd79f22457cbe5773180136b903",
          name: "digitaldownloadsuccess",
          metadata: {
            color: "#000000",
            coverSmallUrl:
              "https://assets.skool.com/f/312afbd79f22457cbe5773180136b903/54b6cc7d794b4f52a9cd5c9063921b532c2a2da369ec41baadfaa7a81a392a20-md.jpg",
            description:
              "Where Creativity Meets AI Technology. We empower individuals to harness the power of AI and their creativity to build their a Digital Download Empire.",
            displayName: "A Digital Innovation Hub",
            initials: "DC",
            logoUrl:
              "https://assets.skool.com/f/312afbd79f22457cbe5773180136b903/8e3e71dbb2c74983a292b3f4fa0cfb61a2c0115ecb764260a9182c5e4655d90c",
            totalMembers: 617,
          },
          createdAt: "2024-06-18T17:32:12.772392Z",
          updatedAt: "2024-11-08T12:14:28.649791Z",
        },
        rank: 217,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 50,
      },
      {
        group: {
          id: "59c1242416694ba5b9bebc32106c6db1",
          name: "swas-private-community-1576",
          metadata: {
            color: "#000000",
            coverSmallUrl:
              "https://assets.skool.com/f/59c1242416694ba5b9bebc32106c6db1/8e0b5edd994549238f4bac9aa29ce58ce105077ef0cc48bea940eb2456a3e8f1-md.jpg",
            description:
              "SWS (Software With Services) Accelerator Program Now Open. This is a private community for GHL affiliates & paying members. ",
            displayName: "SWS Private Community",
            initials: "SW",
            lpAccessType: 2,
            totalMembers: 2333,
          },
          createdAt: "2023-08-21T15:33:05.635162Z",
          updatedAt: "2024-11-08T12:16:39.6844Z",
        },
        rank: 222,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 51,
      },
      {
        group: {
          id: "f4db3d9b5f0349c28131aefcc27bd381",
          name: "classy-business-circle",
          metadata: {
            color: "#BEA681",
            coverSmallUrl:
              "https://assets.skool.com/f/f4db3d9b5f0349c28131aefcc27bd381/5671b6b081e84d01960a37292631eee5937f5ef83af4420fb6e2f159b14499be-md.jpg",
            description:
              "Nr.1 Community für Frauen, die ihr professionelles Business mit ersten zahlenden Kunden starten 💄🥂",
            displayName: "Classy Business Circle",
            initials: "CB",
            logoUrl:
              "https://assets.skool.com/f/f4db3d9b5f0349c28131aefcc27bd381/b99c50deade944129c6f140ddbc7621e53908717d3ff437e93d557fdaaedfd5b",
            lpAccessType: 2,
            totalMembers: 399,
          },
          createdAt: "2024-07-01T15:17:16.064163Z",
          updatedAt: "2024-11-08T12:17:04.036084Z",
        },
        rank: 224,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 52,
      },
      {
        group: {
          id: "5a582e8ee94a44fc891742d11899b0c0",
          name: "poop-scoop-millionaire",
          metadata: {
            color: "#927448",
            coverSmallUrl:
              "https://assets.skool.com/f/5a582e8ee94a44fc891742d11899b0c0/2e8e827cc23940b89852280e005f2399dca90a2e516e4d9f891fa19dbb260f99-md.jpg",
            currentABp: '{"currency":"usd","amount":59900}',
            currentMBp: '{"currency":"usd","amount":6900}',
            description:
              "PSM™ is the premier community for pooper scooper businesses & aspiring entrepreneurs. Learn to make $1k, $10k, or even $100k/Month scooping poop!💩",
            displayName: "Poop Scoop Millionaire™",
            initials: "PS",
            logoUrl:
              "https://assets.skool.com/f/5a582e8ee94a44fc891742d11899b0c0/906dadcd8a1b4a348d109acefb873872e5566a6b8d8c4a6e9676bc030c62e63e",
            totalMembers: 301,
          },
          createdAt: "2024-04-20T23:07:21.217079Z",
          updatedAt: "2024-11-08T12:16:11.954723Z",
        },
        rank: 232,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 53,
      },
      {
        group: {
          id: "f04e22f54d564011a3cc6a1d17c625b3",
          name: "wealth-academy-6133",
          metadata: {
            color: "#009E5D",
            coverSmallUrl:
              "https://assets.skool.com/f/f04e22f54d564011a3cc6a1d17c625b3/1e00420dd63f4fa5864d285539434f669e09c5582f4f40408a6daa6c247c716d-md.jpg",
            description:
              "Helping normal people quit their 9 to 5 jobs and build a freedom-oriented online business.",
            displayName: "Wealth Academy Lite",
            initials: "WA",
            logoUrl:
              "https://assets.skool.com/f/f04e22f54d564011a3cc6a1d17c625b3/dc87fb512abc413ab4bf799a0ae13f99679297afacd64643afa75d6fa13a357e",
            totalMembers: 22218,
          },
          createdAt: "2024-02-10T20:40:00.441651Z",
          updatedAt: "2024-11-08T12:24:41.003584Z",
        },
        rank: 238,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 54,
      },
      {
        group: {
          id: "6c0eb9ef46ae4fb087d8d3839b97b873",
          name: "rich-digital-era-5745",
          metadata: {
            color: "#767676",
            coverSmallUrl:
              "https://assets.skool.com/f/6c0eb9ef46ae4fb087d8d3839b97b873/491e072e39c448dc8a1aeeb3aab3d96256dba3fefe2e4749a14e77c214f4b327-md.jpg",
            currentMBp: '{"currency":"usd","amount":4900}',
            description:
              "Rich Journeys Academy teaches you multiple ways to invest! Wkly mentorship, challenges, giveaways, and a 🔥 community to help you grow!🚀💰  \n\n\n\n\n\n\n",
            displayName: "Rich Journey's Academy 💰",
            initials: "RJ",
            logoUrl:
              "https://assets.skool.com/f/6c0eb9ef46ae4fb087d8d3839b97b873/f05381480379442dbb8f2351498f4c5821b4e9e903fa4292b20b718aa2a9fa97",
            totalMembers: 166,
          },
          createdAt: "2024-05-13T18:21:30.067909Z",
          updatedAt: "2024-11-08T11:40:47.605368Z",
        },
        rank: 240,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 55,
      },
      {
        group: {
          id: "1004d0a5eba6424eb713456b177b96f2",
          name: "unboundceos",
          metadata: {
            color: "#A7A89B",
            coverSmallUrl:
              "https://assets.skool.com/f/1004d0a5eba6424eb713456b177b96f2/e117893758d84219b786dc048e09fa84bad8adbbadf94b80a2a39de71b962a21-md.jpg",
            description:
              "Learn how to make 💰 online with a valuable membership site.",
            displayName: "Magnetic Memberships (Free)",
            initials: "MM",
            logoUrl:
              "https://assets.skool.com/f/1004d0a5eba6424eb713456b177b96f2/b5bda0e6435b4588868523dc4ff5ed5f455364af7f044114adf5f28ffcf26970",
            totalMembers: 611,
          },
          createdAt: "2023-11-07T14:31:19.419612Z",
          updatedAt: "2024-11-08T12:19:26.30973Z",
        },
        rank: 244,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 56,
      },
      {
        group: {
          id: "4a216cf29a98421283f5f1dec339b562",
          name: "vine-university-premium-4195",
          metadata: {
            color: "#FFD700",
            coverSmallUrl:
              "https://assets.skool.com/f/4a216cf29a98421283f5f1dec339b562/02048f58c6574284986fa18e6c9d2f238b6893790dee4bd1af93c089d9bd92ea-md.jpg",
            currentABp: '{"currency":"usd","amount":25000}',
            currentMBp: '{"currency":"usd","amount":5000}',
            description:
              "Learn how to make $4,866/mo with a Faceless Instagram page",
            displayName: "Vine University (Premium)",
            initials: "VU",
            logoUrl:
              "https://assets.skool.com/f/4a216cf29a98421283f5f1dec339b562/d61340f0a9554e02937f3b08618e77ed7ea99023a9004fdab9e4aeb5ed26a77c",
            totalMembers: 295,
          },
          createdAt: "2024-06-06T14:35:11.087382Z",
          updatedAt: "2024-11-08T12:16:06.743494Z",
        },
        rank: 246,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 57,
      },
      {
        group: {
          id: "613920a130194a97aa3d84455667a74d",
          name: "earnwithskool",
          metadata: {
            color: "#0693E3",
            coverSmallUrl:
              "https://assets.skool.com/f/613920a130194a97aa3d84455667a74d/f323e903967144edbb691fe9552dab18ee2c3389bfb24474ae35a669e7127501-md.jpg",
            description:
              "Learn how to grow an engaged audience and turn followers into income, regardless of your budget or experience.",
            displayName: "The Social Growth Skool",
            initials: "ES",
            logoUrl:
              "https://assets.skool.com/f/613920a130194a97aa3d84455667a74d/fff3419bb37545b69b9fabced8d7b40c808f598b519b46a799777cd8b74c5aec",
            totalMembers: 408,
          },
          createdAt: "2024-09-30T13:31:24.950002Z",
          updatedAt: "2024-11-08T12:16:58.96481Z",
        },
        rank: 249,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 58,
      },
      {
        group: {
          id: "cb749b1b73894f8ba7560ae86e507ea1",
          name: "atm",
          metadata: {
            color: "#E4A511",
            coverSmallUrl:
              "https://assets.skool.com/f/cb749b1b73894f8ba7560ae86e507ea1/8496fc9bf1c845039643fb6e3bbf2e7a38f54fef1cac4521b918e4715efa4715-md.jpg",
            currentABp: '{"currency":"usd","amount":19900}',
            description:
              "Join The ATM Business Network! Build a profitable ATM business, earn passive income, and gain financial freedom with the support of our community.",
            displayName: "The ATM Business Network",
            initials: "BN",
            logoUrl:
              "https://assets.skool.com/f/cb749b1b73894f8ba7560ae86e507ea1/c1d5df51389d4a6ea2e1ec6348d2eac0dc5e13eb061f4188a1fbf7669d11f240",
            totalMembers: 765,
          },
          createdAt: "2024-08-30T01:27:19.698795Z",
          updatedAt: "2024-11-08T12:20:33.231234Z",
        },
        rank: 262,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 59,
      },
      {
        group: {
          id: "6db2b9376f124664b5696b150ec538db",
          name: "long-money-trucking-8242",
          metadata: {
            color: "#F3DC00",
            coverSmallUrl:
              "https://assets.skool.com/f/6db2b9376f124664b5696b150ec538db/029b31a34c7b4c4ea729c352cd3fdc9c1520edcfeb304ce2a99efe0540aa597f-md.jpg",
            description:
              "Join Long Money Trucking’s free community for exclusive trainings, templates, and pro insights. Connect, learn, and scale your trucking success!",
            displayName: "Long Money Trucking (Free)",
            initials: "LM",
            logoUrl:
              "https://assets.skool.com/f/6db2b9376f124664b5696b150ec538db/2147824e41894e93b90666733aa457ac4848134afbf8404e931fe49a743a1bc0",
            totalMembers: 280,
          },
          createdAt: "2024-11-02T20:46:44.318172Z",
          updatedAt: "2024-11-08T12:16:36.688647Z",
        },
        rank: 263,
        tags: null,
        categoryId: "ee12b9155a0845ed9226248a8b623b89",
        categoryRank: 60,
      },
    ],
    numGroups: 1000,
    categories: [
      {
        id: "ee12b9155a0845ed9226248a8b623b89",
        name: "💰  Business",
      },
      {
        id: "928a50e71b0245648cdc3193f6ae1c4b",
        name: "🍎  Health & fitness",
      },
      {
        id: "db666f6a98f4472d9f89d92797ec5d3f",
        name: "📚  Personal development",
      },
      {
        id: "0e59b6036042439d8c0a8c4af60be234",
        name: "🎨  Arts & crafts",
      },
      {
        id: "3822fde7ee2e46e0843412e4e6be8a67",
        name: "🎸  Music",
      },
      {
        id: "bb37f24df4304d07beeb399b7b55cd84",
        name: "📹 Photo & Video",
      },
      {
        id: "90a9d60f0fe44dbd8603d24e27f30dcd",
        name: "🛍️  E-commerce",
      },
      {
        id: "4d61d0872a844283a02cc62398c0a9e1",
        name: "❤️  Love",
      },
      {
        id: "b08f420b211a40aaa0024dee9b6bd107",
        name: "🚀  Sales & Marketing",
      },
      {
        id: "43cc9f380e4b4e5c81f5e67c69463263",
        name: "💻  Tech",
      },
      {
        id: "351e3684ec554e2681e97f6add25dc02",
        name: "🙏  Spirituality",
      },
      {
        id: "72221d79ce014bca8dd06a4d9fc4134d",
        name: "📈  Finance",
      },
      {
        id: "56de3cfc3ceb4fe2a81db32da48abc52",
        name: "👠  Beauty & fashion",
      },
      {
        id: "48a464d8750a4b1c8929151bd1aa664b",
        name: "🏠  Real estate",
      },
      {
        id: "5d337543eeb649d6ad002b8213a30afb",
        name: "🎮  Gaming",
      },
      {
        id: "82602e4ec53548e8b7868365fbe645a4",
        name: "⚽  Sports",
      },
      {
        id: "59c0a3cb4519424d8f609f28db2be8e3",
        name: "⌛  Productivity",
      },
      {
        id: "c94b48aadc3445d6a5b9b0acd09d3d77",
        name: "🚗  Cars",
      },
      {
        id: "a848af6e7aaa4688bf1729c21bb7f258",
        name: "🐶  Pets",
      },
      {
        id: "bd61aa6acae24d1f9fe30a60d9acd09e",
        name: "🌎 Languages",
      },
      {
        id: "e8cc1f6b36774f5ab2e1d78eee23f429",
        name: "✈️ Travel",
      },
    ],
    searchQueryParam: null,
    typeParam: null,
    filterParam: null,
    categoryParam: "ee12b9155a0845ed9226248a8b623b89",
    hasMore: false,
    isFrontPage: false,
    self: null,
    currentGroup: null,
    isMobile: false,
    isApp: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    maintenance: {},
    currentPage: {
      query: {
        c: "ee12b9155a0845ed9226248a8b623b89",
        p: "2",
      },
      pageKey: "5bo4bgnkfjvgluvy3n3ygw",
      path: "/discovery",
      isPostDetails: false,
      isChat: false,
    },
    renderData: {
      groups: [
        {
          group: {
            id: "0a06a296f7cd4d28b5da867098733415",
            name: "creatoraccelerator",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/0a06a296f7cd4d28b5da867098733415/39b30a722b0c4996a8d59f13f22e7c51a36a67fee3574715915ead5b76f34868-md.jpg",
              description:
                "Partner With Your First Content Creator And Then Turn Their Followers Into A $10k/mo Skool Community In 14 days\n\nsupport@growthoperator.com",
              displayName: "Creator Accelerator ",
              initials: "CC",
              logoUrl:
                "https://assets.skool.com/f/0a06a296f7cd4d28b5da867098733415/461d063ea8c846b685eaac77449cf2ba3d9a252bf9804f279915021b734d9318",
              lpAccessType: 2,
              totalMembers: 1948,
            },
            createdAt: "2023-05-23T23:15:12.145511Z",
            updatedAt: "2024-11-08T12:17:09.225368Z",
          },
          rank: 139,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 31,
        },
        {
          group: {
            id: "0a0ed0dd60dc4702a95e75943c2d5b07",
            name: "3ccc",
            metadata: {
              color: "#EB6E00",
              coverSmallUrl:
                "https://assets.skool.com/f/0a0ed0dd60dc4702a95e75943c2d5b07/d0a4191e46604059851db9ff276278d0f8f9fd762cd14e70b2aa70f282c3ae13-md.jpg",
              description:
                "Deine Skool Community 𝙉𝘼𝘾𝙃𝙃𝘼𝙇𝙏𝙄𝙂 + 𝙋𝙍𝙊𝙁𝙄𝙏𝘼𝘽𝙀𝙇 aufbauen  🆓  ❱❱ 💰 ❱❱ 💰💰 𝘦𝘷𝘦𝘳𝘺𝘵𝘩𝘪𝘯𝘨 𝘸𝘪𝘵𝘩 🧡",
              displayName: "Community Creators Collective",
              initials: "3C",
              logoUrl:
                "https://assets.skool.com/f/0a0ed0dd60dc4702a95e75943c2d5b07/f9a743b4e54343e59793743453a1f9d0fdce87caa5ea413eb6cfe8fdd4e6a4c9",
              totalMembers: 267,
            },
            createdAt: "2024-03-16T01:23:42.977207Z",
            updatedAt: "2024-11-08T12:23:44.217587Z",
          },
          rank: 140,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 32,
        },
        {
          group: {
            id: "e271f1db8d0045e6962d5f420bab70c5",
            name: "the-ghost-family-1230",
            metadata: {
              color: "#767676",
              coverSmallUrl:
                "https://assets.skool.com/f/e271f1db8d0045e6962d5f420bab70c5/ab1355dc7cb047a49e28e28b146d069498f7edd6eca3475f8cb970c78beef87f-md.jpg",
              currentMBp: '{"currency":"usd","amount":4500}',
              description:
                "TGF, where we guide you through a journey to help you monetize your social media and assist you in constructing a successful 6-7-figure business.\n\n\n\n\n",
              displayName: "The Ghost Family",
              initials: "TG",
              logoUrl:
                "https://assets.skool.com/f/e271f1db8d0045e6962d5f420bab70c5/151c745c1a464769839d9de68efab4e64299e4b0577a492095d7399c83161798",
              lpAccessType: 1,
              totalMembers: 354,
            },
            createdAt: "2024-01-27T01:08:42.829406Z",
            updatedAt: "2024-11-08T11:14:15.573781Z",
          },
          rank: 141,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 33,
        },
        {
          group: {
            id: "381b2eecca5442df85c8ab8c6a264d8c",
            name: "agencyowners",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/381b2eecca5442df85c8ab8c6a264d8c/8e9288318e75445ca6ec11ec375edc300f42beaabdc242bf835f8fef595e996a-md.jpg",
              description:
                "Master your environment by surrounding yourself with other agency owners. \n",
              displayName: "Agency Owners",
              initials: "AO",
              logoUrl:
                "https://assets.skool.com/f/381b2eecca5442df85c8ab8c6a264d8c/bc348b04b9f1422e8c0bc8e43b48833657e9864ad5b849fc8f9e9ada18e1d6c3",
              lpAccessType: 1,
              totalMembers: 5881,
            },
            createdAt: "2023-06-13T16:04:54.797936Z",
            updatedAt: "2024-11-08T12:14:36.1163Z",
          },
          rank: 145,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 34,
        },
        {
          group: {
            id: "d61a830f7d4c4c2ab0930907061024d9",
            name: "super-affiliate-academy",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/d61a830f7d4c4c2ab0930907061024d9/fc40b91456bd4a9cab102671e219cacf8ca7c6c81d224e5abc63a3c6494b7d2c-md.jpg",
              description:
                "Become a super affiliate and get paid to never create products.  Affiliate Marketers you have found your paradise. ",
              displayName: "Super Affiliate Academy (FREE)",
              initials: "SA",
              logoUrl:
                "https://assets.skool.com/f/d61a830f7d4c4c2ab0930907061024d9/6b8842dd70e54d3f8753495d50c066b49716fbc1ef08403a94f57fbdc29e12cc",
              totalMembers: 3937,
            },
            createdAt: "2024-04-25T12:54:57.282145Z",
            updatedAt: "2024-11-08T12:17:32.863583Z",
          },
          rank: 151,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 35,
        },
        {
          group: {
            id: "9e05c6f8cf4946c498071de051360b60",
            name: "the-1percent-club",
            metadata: {
              color: "#000000",
              coverSmallUrl:
                "https://assets.skool.com/f/9e05c6f8cf4946c498071de051360b60/c911c3af33b24dee8c14f7312753b0c1eacf71f6215f4b738f56eb503dac4371-md.jpg",
              description:
                "Join the top 1% through real business education, self improvement & community.",
              displayName: "The 1% Club",
              initials: "T1",
              logoUrl:
                "https://assets.skool.com/f/9e05c6f8cf4946c498071de051360b60/27b057f46fde44cd803d36e31a9c1bdbe1b8fff850ec47deb9b7742e95b780a2",
              totalMembers: 3508,
            },
            createdAt: "2024-02-25T07:20:52.51954Z",
            updatedAt: "2024-11-08T12:17:32.180946Z",
          },
          rank: 155,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 36,
        },
        {
          group: {
            id: "2bf1751720144692a1789af91fbadcab",
            name: "elite-power-community-9108",
            metadata: {
              color: "#DF1A1A",
              coverSmallUrl:
                "https://assets.skool.com/f/2bf1751720144692a1789af91fbadcab/91e08b6a18c5405e943f939194ece030f56f72eb228b4c308e4caab5ef87f45b-md.jpg",
              currentMBp: '{"currency":"usd","amount":2500}',
              description:
                "A community of like-minded people and inspiring entrepreneurs learning how to make money online, leveraging Social Media & Affiliate Marketing.",
              displayName: "Elite Power Community",
              initials: "EP",
              logoUrl:
                "https://assets.skool.com/f/2bf1751720144692a1789af91fbadcab/7b8f319814a84d59a802b2aa17e1583d4df46c8fe2b04a9f8ad83977447f669e",
              totalMembers: 771,
            },
            createdAt: "2024-07-08T19:29:20.018166Z",
            updatedAt: "2024-11-08T12:16:06.534386Z",
          },
          rank: 157,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 37,
        },
        {
          group: {
            id: "4e2d7072007543158ce67f6b41e92113",
            name: "schoolofmentors",
            metadata: {
              color: "#DF1A1A",
              coverSmallUrl:
                "https://assets.skool.com/f/4e2d7072007543158ce67f6b41e92113/79440ed92d764136af745af9b4ae41041df2800b804045a89ef63f28494c810b-md.jpg",
              currentABp: '{"currency":"usd","amount":33300}',
              currentMBp: '{"currency":"usd","amount":3700}',
              description:
                "What if you could get mentored by the greatest MILLIONAIRE and even BILLIONAIRE entrepreneurs that we interview?",
              displayName: "School of Mentors",
              initials: "HK",
              logoUrl:
                "https://assets.skool.com/f/4e2d7072007543158ce67f6b41e92113/d7986432697d409193fe7732f450a73cae19fb1e30d14960b56253e5d5db69ee",
              totalMembers: 1664,
            },
            createdAt: "2024-05-15T20:40:04.346572Z",
            updatedAt: "2024-11-08T12:17:52.944433Z",
          },
          rank: 168,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 38,
        },
        {
          group: {
            id: "b126b34f8241476f8b648a8b5387a168",
            name: "6fb",
            metadata: {
              color: "#009E5D",
              coverSmallUrl:
                "https://assets.skool.com/f/b126b34f8241476f8b648a8b5387a168/3146560069de41438daaa51b4a57b9a6d93d1629cacd449aa323334346054bac-md.jpg",
              description:
                "The 6FB Mentorship equips you with the skills, network, and strategies to elevate your career and secure financial freedom!",
              displayName: "6 Figure Barber Mentorship",
              initials: "6F",
              logoUrl:
                "https://assets.skool.com/f/b126b34f8241476f8b648a8b5387a168/6533783f02a9494bb4bfef905868172fbe5d15af4b744838aacc457064d60512",
              lpAccessType: 2,
              totalMembers: 1232,
            },
            createdAt: "2024-08-27T17:43:15.83167Z",
            updatedAt: "2024-11-08T12:14:32.77357Z",
          },
          rank: 169,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 39,
        },
        {
          group: {
            id: "68ec6c9d8c574dddbb6e8f5cbaac37ee",
            name: "synthesizer",
            metadata: {
              color: "#2929FF",
              coverSmallUrl:
                "https://assets.skool.com/f/68ec6c9d8c574dddbb6e8f5cbaac37ee/3e12fd38eb734ec2b8b452448356e512141cc280e54d4e14aa2e3b2ca668d1af-md.jpg",
              description:
                "Helping educational creators get paid to change the world.",
              displayName: "Synthesizer",
              initials: "SY",
              logoUrl:
                "https://assets.skool.com/f/68ec6c9d8c574dddbb6e8f5cbaac37ee/5785b62293fd432daecc5c94aee6211b2792844325bc4731bb74a3a5b8acf2ee",
              lpAccessType: 1,
              totalMembers: 13951,
            },
            createdAt: "2021-08-10T15:39:54.067523Z",
            updatedAt: "2024-11-08T12:16:48.124381Z",
          },
          rank: 172,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 40,
        },
        {
          group: {
            id: "6fcc7aac6db641c4b2ffe70edb80d6f6",
            name: "women-helping-women-mastermind-9715",
            metadata: {
              color: "#F75B9D",
              coverSmallUrl:
                "https://assets.skool.com/f/6fcc7aac6db641c4b2ffe70edb80d6f6/b9847dbf17ea40978c1745a09bba39d0a38bb8091b654672a9cee774510179b5-md.jpg",
              description:
                "Women Helping Women Mastermind is a community for Women Entrepreneurs to mastermind, network, collaborate and learn how to grow their businesses.",
              displayName: "Women Helping Women Mastermind",
              initials: "WH",
              logoUrl:
                "https://assets.skool.com/f/6fcc7aac6db641c4b2ffe70edb80d6f6/08003ee6365143a18ccdeacd755597e93bc44ba10fb94db6b4ef19e0119b751f",
              totalMembers: 5652,
            },
            createdAt: "2024-06-29T23:46:38.807937Z",
            updatedAt: "2024-11-08T12:17:10.108853Z",
          },
          rank: 176,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 41,
        },
        {
          group: {
            id: "cf6d62948de04aeda815c6c751dabe5b",
            name: "appointment-setting-community",
            metadata: {
              color: "#DF1A1A",
              coverSmallUrl:
                "https://assets.skool.com/f/cf6d62948de04aeda815c6c751dabe5b/d6cf7a045d0049fe8fca449e439e67877fa5637e114c4f00b8239b5009fb9933-md.jpg",
              description:
                "(Biz Owners, Looking for top 1% Setters/VAs? DM admin)\n\nThis group is for setters to connect & learn! We train & place the best setters on the market",
              displayName: "Appointment Setting",
              initials: "AS",
              logoUrl:
                "https://assets.skool.com/f/cf6d62948de04aeda815c6c751dabe5b/b0785cf1b3d840b6a05f59c30b70dc6ff0cba188dafa42d297e8c98d9d88575a",
              lpAccessType: 2,
              totalMembers: 1561,
            },
            createdAt: "2024-04-23T13:18:52.304277Z",
            updatedAt: "2024-11-08T12:16:42.512104Z",
          },
          rank: 181,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 42,
        },
        {
          group: {
            id: "660f5f09c76447568645da5639dd48eb",
            name: "digitalceos",
            metadata: {
              color: "#E4A511",
              coverSmallUrl:
                "https://assets.skool.com/f/660f5f09c76447568645da5639dd48eb/c9f2125247724eaebdf406f80c3cdfe9dcafc3e43baa4c7a85f31cd57d5932d5-md.jpg",
              description:
                "You won’t find any outdated degrees or meaningless trophies here. We provide you with real business skills for the digital age. Strap On Your Boots!",
              displayName: "Digital CEOs",
              initials: "DC",
              logoUrl:
                "https://assets.skool.com/f/660f5f09c76447568645da5639dd48eb/17f7333fb2d4425a80bd19f0ee70224e01bd4cc34d204421a99e9088a09fad95",
              lpAccessType: 2,
              totalMembers: 4329,
            },
            createdAt: "2023-02-28T01:05:34.671315Z",
            updatedAt: "2024-11-08T12:17:07.811858Z",
          },
          rank: 187,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 43,
        },
        {
          group: {
            id: "26d7216cf4aa4f99bdbd90f8a69c2a38",
            name: "the-founders-club",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/26d7216cf4aa4f99bdbd90f8a69c2a38/22b8d8af849a4b45b479c48d204c8f5ae141396558a44da5bf1d8fc3530f3f34-md.jpg",
              description:
                "The ultimate community for people looking to earn a full-time income from home just typing messages on their phone",
              displayName: "The Founders Club",
              initials: "TF",
              logoUrl:
                "https://assets.skool.com/f/26d7216cf4aa4f99bdbd90f8a69c2a38/9881e3cde56f47238be50166354a56e35c1fda6921a74a65b5746be55c9edf9a",
              totalMembers: 37339,
            },
            createdAt: "2023-10-04T17:40:35.266701Z",
            updatedAt: "2024-11-08T12:17:29.998834Z",
          },
          rank: 196,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 44,
        },
        {
          group: {
            id: "ebf7e91361e04d26a863164898b5522c",
            name: "djk",
            metadata: {
              color: "#DF1A1A",
              coverSmallUrl:
                "https://assets.skool.com/f/ebf7e91361e04d26a863164898b5522c/05644e7b2c144150882cf186da04436f60f9d9c665a1418d8c5529efb902ddc7-md.jpg",
              description:
                "Learn how to fire your boss and start a $10,000/month business part-time.",
              displayName: "Day Job Killer Mastermind ",
              initials: "DK",
              logoUrl:
                "https://assets.skool.com/f/ebf7e91361e04d26a863164898b5522c/efbd74724f964b01b8c8908dab4e61d6462e364570814207925f23738406d3e4",
              lpAccessType: 1,
              totalMembers: 5247,
            },
            createdAt: "2024-09-22T02:19:09.771277Z",
            updatedAt: "2024-11-08T12:17:20.470681Z",
          },
          rank: 200,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 45,
        },
        {
          group: {
            id: "66787df20bca46bd91ab32875aae1b8a",
            name: "queenbiz",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/66787df20bca46bd91ab32875aae1b8a/d56710391b434205a8b53402e4e63968d6727f5e77884cf4bce7414dc032fa44-md.jpg",
              currentMBp: '{"currency":"usd","amount":5400}',
              description:
                "✨ Rejoins une communauté de femmes ambitieuses prêtes à gagner de l'argent en ligne tout en profitant de leur vie et en s'entraidant vers la réussite.",
              displayName: "QueenBiz",
              initials: "SN",
              logoUrl:
                "https://assets.skool.com/f/66787df20bca46bd91ab32875aae1b8a/4c4c19a1456d43c1843d643d637f216c3859ed9596564ff694679852a41ee107",
              lpAccessType: 2,
              totalMembers: 145,
            },
            createdAt: "2024-08-15T12:45:37.723366Z",
            updatedAt: "2024-11-08T12:21:06.79675Z",
          },
          rank: 203,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 46,
        },
        {
          group: {
            id: "14ebfab7677842298a1521527ffdd0fb",
            name: "digitalfreedommentorship",
            metadata: {
              color: "#009E5D",
              coverSmallUrl:
                "https://assets.skool.com/f/14ebfab7677842298a1521527ffdd0fb/c19735cec99f439ea2ec5efe3846941e2d91a1e4764c4e1e89ebac8c2d7b3959-md.jpg",
              currentMBp: '{"currency":"usd","amount":10000}',
              description:
                "The last mentorship you'll ever need, that will show you step-by-step how to create a successful online digital product business. ",
              displayName: "Digital Freedom Accelerator™",
              initials: "HP",
              logoUrl:
                "https://assets.skool.com/f/14ebfab7677842298a1521527ffdd0fb/aa5a8eac5ada4234918014e84b4faa15b97b686dd0b148df90e70e170bf2184d",
              totalMembers: 773,
            },
            createdAt: "2024-02-20T14:27:20.558489Z",
            updatedAt: "2024-11-08T12:17:24.256035Z",
          },
          rank: 208,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 47,
        },
        {
          group: {
            id: "e256cd9ef1ac4dbe9197634db46e9e3b",
            name: "makerschool",
            metadata: {
              color: "#0F0F0F",
              coverSmallUrl:
                "https://assets.skool.com/f/e256cd9ef1ac4dbe9197634db46e9e3b/b9f477a8e299468caf859cb312a100432590cf7841b241c8aac84f45370218b6-md.jpg",
              currentABp: '{"currency":"usd","amount":66000}',
              currentMBp: '{"currency":"usd","amount":6600}',
              description:
                "The straightest-line path to getting your first automation customer. Price increases every 10 members.",
              displayName: "Maker School",
              initials: "MS",
              logoUrl:
                "https://assets.skool.com/f/e256cd9ef1ac4dbe9197634db46e9e3b/a6c0d285b72c4f91ba138703ad4f5a4f10a1ca89756d4276abf5c7ff3e3065a3",
              totalMembers: 788,
            },
            createdAt: "2024-09-05T20:09:16.650875Z",
            updatedAt: "2024-11-08T12:16:49.451572Z",
          },
          rank: 212,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 48,
        },
        {
          group: {
            id: "608fbcc2b69646a7b94ad26cbc886094",
            name: "thebreakerscreatoracademy",
            metadata: {
              color: "#ED1C24",
              coverSmallUrl:
                "https://assets.skool.com/f/608fbcc2b69646a7b94ad26cbc886094/8a740b5dd9404e5eb1a1dc4b28b83316d8695c0dcaa44d1487b8aa7a7755321d-md.jpg",
              currentABp: '{"currency":"usd","amount":28800}',
              currentMBp: '{"currency":"usd","amount":3000}',
              description:
                "A community of like-minded creators making a Kingdom impact!",
              displayName: "The Breakers Creator Academy",
              initials: "CA",
              logoUrl:
                "https://assets.skool.com/f/608fbcc2b69646a7b94ad26cbc886094/3806c76aca3b42da94a4447f5391a0c1d7440223b5664076809d5b2accdf6ea0",
              lpAccessType: 2,
              totalMembers: 341,
            },
            createdAt: "2024-04-23T19:29:09.332352Z",
            updatedAt: "2024-11-08T12:06:02.386613Z",
          },
          rank: 213,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 49,
        },
        {
          group: {
            id: "312afbd79f22457cbe5773180136b903",
            name: "digitaldownloadsuccess",
            metadata: {
              color: "#000000",
              coverSmallUrl:
                "https://assets.skool.com/f/312afbd79f22457cbe5773180136b903/54b6cc7d794b4f52a9cd5c9063921b532c2a2da369ec41baadfaa7a81a392a20-md.jpg",
              description:
                "Where Creativity Meets AI Technology. We empower individuals to harness the power of AI and their creativity to build their a Digital Download Empire.",
              displayName: "A Digital Innovation Hub",
              initials: "DC",
              logoUrl:
                "https://assets.skool.com/f/312afbd79f22457cbe5773180136b903/8e3e71dbb2c74983a292b3f4fa0cfb61a2c0115ecb764260a9182c5e4655d90c",
              totalMembers: 617,
            },
            createdAt: "2024-06-18T17:32:12.772392Z",
            updatedAt: "2024-11-08T12:14:28.649791Z",
          },
          rank: 217,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 50,
        },
        {
          group: {
            id: "59c1242416694ba5b9bebc32106c6db1",
            name: "swas-private-community-1576",
            metadata: {
              color: "#000000",
              coverSmallUrl:
                "https://assets.skool.com/f/59c1242416694ba5b9bebc32106c6db1/8e0b5edd994549238f4bac9aa29ce58ce105077ef0cc48bea940eb2456a3e8f1-md.jpg",
              description:
                "SWS (Software With Services) Accelerator Program Now Open. This is a private community for GHL affiliates & paying members. ",
              displayName: "SWS Private Community",
              initials: "SW",
              lpAccessType: 2,
              totalMembers: 2333,
            },
            createdAt: "2023-08-21T15:33:05.635162Z",
            updatedAt: "2024-11-08T12:16:39.6844Z",
          },
          rank: 222,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 51,
        },
        {
          group: {
            id: "f4db3d9b5f0349c28131aefcc27bd381",
            name: "classy-business-circle",
            metadata: {
              color: "#BEA681",
              coverSmallUrl:
                "https://assets.skool.com/f/f4db3d9b5f0349c28131aefcc27bd381/5671b6b081e84d01960a37292631eee5937f5ef83af4420fb6e2f159b14499be-md.jpg",
              description:
                "Nr.1 Community für Frauen, die ihr professionelles Business mit ersten zahlenden Kunden starten 💄🥂",
              displayName: "Classy Business Circle",
              initials: "CB",
              logoUrl:
                "https://assets.skool.com/f/f4db3d9b5f0349c28131aefcc27bd381/b99c50deade944129c6f140ddbc7621e53908717d3ff437e93d557fdaaedfd5b",
              lpAccessType: 2,
              totalMembers: 399,
            },
            createdAt: "2024-07-01T15:17:16.064163Z",
            updatedAt: "2024-11-08T12:17:04.036084Z",
          },
          rank: 224,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 52,
        },
        {
          group: {
            id: "5a582e8ee94a44fc891742d11899b0c0",
            name: "poop-scoop-millionaire",
            metadata: {
              color: "#927448",
              coverSmallUrl:
                "https://assets.skool.com/f/5a582e8ee94a44fc891742d11899b0c0/2e8e827cc23940b89852280e005f2399dca90a2e516e4d9f891fa19dbb260f99-md.jpg",
              currentABp: '{"currency":"usd","amount":59900}',
              currentMBp: '{"currency":"usd","amount":6900}',
              description:
                "PSM™ is the premier community for pooper scooper businesses & aspiring entrepreneurs. Learn to make $1k, $10k, or even $100k/Month scooping poop!💩",
              displayName: "Poop Scoop Millionaire™",
              initials: "PS",
              logoUrl:
                "https://assets.skool.com/f/5a582e8ee94a44fc891742d11899b0c0/906dadcd8a1b4a348d109acefb873872e5566a6b8d8c4a6e9676bc030c62e63e",
              totalMembers: 301,
            },
            createdAt: "2024-04-20T23:07:21.217079Z",
            updatedAt: "2024-11-08T12:16:11.954723Z",
          },
          rank: 232,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 53,
        },
        {
          group: {
            id: "f04e22f54d564011a3cc6a1d17c625b3",
            name: "wealth-academy-6133",
            metadata: {
              color: "#009E5D",
              coverSmallUrl:
                "https://assets.skool.com/f/f04e22f54d564011a3cc6a1d17c625b3/1e00420dd63f4fa5864d285539434f669e09c5582f4f40408a6daa6c247c716d-md.jpg",
              description:
                "Helping normal people quit their 9 to 5 jobs and build a freedom-oriented online business.",
              displayName: "Wealth Academy Lite",
              initials: "WA",
              logoUrl:
                "https://assets.skool.com/f/f04e22f54d564011a3cc6a1d17c625b3/dc87fb512abc413ab4bf799a0ae13f99679297afacd64643afa75d6fa13a357e",
              totalMembers: 22218,
            },
            createdAt: "2024-02-10T20:40:00.441651Z",
            updatedAt: "2024-11-08T12:24:41.003584Z",
          },
          rank: 238,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 54,
        },
        {
          group: {
            id: "6c0eb9ef46ae4fb087d8d3839b97b873",
            name: "rich-digital-era-5745",
            metadata: {
              color: "#767676",
              coverSmallUrl:
                "https://assets.skool.com/f/6c0eb9ef46ae4fb087d8d3839b97b873/491e072e39c448dc8a1aeeb3aab3d96256dba3fefe2e4749a14e77c214f4b327-md.jpg",
              currentMBp: '{"currency":"usd","amount":4900}',
              description:
                "Rich Journeys Academy teaches you multiple ways to invest! Wkly mentorship, challenges, giveaways, and a 🔥 community to help you grow!🚀💰  \n\n\n\n\n\n\n",
              displayName: "Rich Journey's Academy 💰",
              initials: "RJ",
              logoUrl:
                "https://assets.skool.com/f/6c0eb9ef46ae4fb087d8d3839b97b873/f05381480379442dbb8f2351498f4c5821b4e9e903fa4292b20b718aa2a9fa97",
              totalMembers: 166,
            },
            createdAt: "2024-05-13T18:21:30.067909Z",
            updatedAt: "2024-11-08T11:40:47.605368Z",
          },
          rank: 240,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 55,
        },
        {
          group: {
            id: "1004d0a5eba6424eb713456b177b96f2",
            name: "unboundceos",
            metadata: {
              color: "#A7A89B",
              coverSmallUrl:
                "https://assets.skool.com/f/1004d0a5eba6424eb713456b177b96f2/e117893758d84219b786dc048e09fa84bad8adbbadf94b80a2a39de71b962a21-md.jpg",
              description:
                "Learn how to make 💰 online with a valuable membership site.",
              displayName: "Magnetic Memberships (Free)",
              initials: "MM",
              logoUrl:
                "https://assets.skool.com/f/1004d0a5eba6424eb713456b177b96f2/b5bda0e6435b4588868523dc4ff5ed5f455364af7f044114adf5f28ffcf26970",
              totalMembers: 611,
            },
            createdAt: "2023-11-07T14:31:19.419612Z",
            updatedAt: "2024-11-08T12:19:26.30973Z",
          },
          rank: 244,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 56,
        },
        {
          group: {
            id: "4a216cf29a98421283f5f1dec339b562",
            name: "vine-university-premium-4195",
            metadata: {
              color: "#FFD700",
              coverSmallUrl:
                "https://assets.skool.com/f/4a216cf29a98421283f5f1dec339b562/02048f58c6574284986fa18e6c9d2f238b6893790dee4bd1af93c089d9bd92ea-md.jpg",
              currentABp: '{"currency":"usd","amount":25000}',
              currentMBp: '{"currency":"usd","amount":5000}',
              description:
                "Learn how to make $4,866/mo with a Faceless Instagram page",
              displayName: "Vine University (Premium)",
              initials: "VU",
              logoUrl:
                "https://assets.skool.com/f/4a216cf29a98421283f5f1dec339b562/d61340f0a9554e02937f3b08618e77ed7ea99023a9004fdab9e4aeb5ed26a77c",
              totalMembers: 295,
            },
            createdAt: "2024-06-06T14:35:11.087382Z",
            updatedAt: "2024-11-08T12:16:06.743494Z",
          },
          rank: 246,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 57,
        },
        {
          group: {
            id: "613920a130194a97aa3d84455667a74d",
            name: "earnwithskool",
            metadata: {
              color: "#0693E3",
              coverSmallUrl:
                "https://assets.skool.com/f/613920a130194a97aa3d84455667a74d/f323e903967144edbb691fe9552dab18ee2c3389bfb24474ae35a669e7127501-md.jpg",
              description:
                "Learn how to grow an engaged audience and turn followers into income, regardless of your budget or experience.",
              displayName: "The Social Growth Skool",
              initials: "ES",
              logoUrl:
                "https://assets.skool.com/f/613920a130194a97aa3d84455667a74d/fff3419bb37545b69b9fabced8d7b40c808f598b519b46a799777cd8b74c5aec",
              totalMembers: 408,
            },
            createdAt: "2024-09-30T13:31:24.950002Z",
            updatedAt: "2024-11-08T12:16:58.96481Z",
          },
          rank: 249,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 58,
        },
        {
          group: {
            id: "cb749b1b73894f8ba7560ae86e507ea1",
            name: "atm",
            metadata: {
              color: "#E4A511",
              coverSmallUrl:
                "https://assets.skool.com/f/cb749b1b73894f8ba7560ae86e507ea1/8496fc9bf1c845039643fb6e3bbf2e7a38f54fef1cac4521b918e4715efa4715-md.jpg",
              currentABp: '{"currency":"usd","amount":19900}',
              description:
                "Join The ATM Business Network! Build a profitable ATM business, earn passive income, and gain financial freedom with the support of our community.",
              displayName: "The ATM Business Network",
              initials: "BN",
              logoUrl:
                "https://assets.skool.com/f/cb749b1b73894f8ba7560ae86e507ea1/c1d5df51389d4a6ea2e1ec6348d2eac0dc5e13eb061f4188a1fbf7669d11f240",
              totalMembers: 765,
            },
            createdAt: "2024-08-30T01:27:19.698795Z",
            updatedAt: "2024-11-08T12:20:33.231234Z",
          },
          rank: 262,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 59,
        },
        {
          group: {
            id: "6db2b9376f124664b5696b150ec538db",
            name: "long-money-trucking-8242",
            metadata: {
              color: "#F3DC00",
              coverSmallUrl:
                "https://assets.skool.com/f/6db2b9376f124664b5696b150ec538db/029b31a34c7b4c4ea729c352cd3fdc9c1520edcfeb304ce2a99efe0540aa597f-md.jpg",
              description:
                "Join Long Money Trucking’s free community for exclusive trainings, templates, and pro insights. Connect, learn, and scale your trucking success!",
              displayName: "Long Money Trucking (Free)",
              initials: "LM",
              logoUrl:
                "https://assets.skool.com/f/6db2b9376f124664b5696b150ec538db/2147824e41894e93b90666733aa457ac4848134afbf8404e931fe49a743a1bc0",
              totalMembers: 280,
            },
            createdAt: "2024-11-02T20:46:44.318172Z",
            updatedAt: "2024-11-08T12:16:36.688647Z",
          },
          rank: 263,
          tags: null,
          categoryId: "ee12b9155a0845ed9226248a8b623b89",
          categoryRank: 60,
        },
      ],
      categories: [
        {
          id: "ee12b9155a0845ed9226248a8b623b89",
          name: "💰  Business",
        },
        {
          id: "928a50e71b0245648cdc3193f6ae1c4b",
          name: "🍎  Health & fitness",
        },
        {
          id: "db666f6a98f4472d9f89d92797ec5d3f",
          name: "📚  Personal development",
        },
        {
          id: "0e59b6036042439d8c0a8c4af60be234",
          name: "🎨  Arts & crafts",
        },
        {
          id: "3822fde7ee2e46e0843412e4e6be8a67",
          name: "🎸  Music",
        },
        {
          id: "bb37f24df4304d07beeb399b7b55cd84",
          name: "📹 Photo & Video",
        },
        {
          id: "90a9d60f0fe44dbd8603d24e27f30dcd",
          name: "🛍️  E-commerce",
        },
        {
          id: "4d61d0872a844283a02cc62398c0a9e1",
          name: "❤️  Love",
        },
        {
          id: "b08f420b211a40aaa0024dee9b6bd107",
          name: "🚀  Sales & Marketing",
        },
        {
          id: "43cc9f380e4b4e5c81f5e67c69463263",
          name: "💻  Tech",
        },
        {
          id: "351e3684ec554e2681e97f6add25dc02",
          name: "🙏  Spirituality",
        },
        {
          id: "72221d79ce014bca8dd06a4d9fc4134d",
          name: "📈  Finance",
        },
        {
          id: "56de3cfc3ceb4fe2a81db32da48abc52",
          name: "👠  Beauty & fashion",
        },
        {
          id: "48a464d8750a4b1c8929151bd1aa664b",
          name: "🏠  Real estate",
        },
        {
          id: "5d337543eeb649d6ad002b8213a30afb",
          name: "🎮  Gaming",
        },
        {
          id: "82602e4ec53548e8b7868365fbe645a4",
          name: "⚽  Sports",
        },
        {
          id: "59c0a3cb4519424d8f609f28db2be8e3",
          name: "⌛  Productivity",
        },
        {
          id: "c94b48aadc3445d6a5b9b0acd09d3d77",
          name: "🚗  Cars",
        },
        {
          id: "a848af6e7aaa4688bf1729c21bb7f258",
          name: "🐶  Pets",
        },
        {
          id: "bd61aa6acae24d1f9fe30a60d9acd09e",
          name: "🌎 Languages",
        },
        {
          id: "e8cc1f6b36774f5ab2e1d78eee23f429",
          name: "✈️ Travel",
        },
      ],
      total: 1000,
    },
    referer: "",
    host: "www.skool.com",
    growthBookData: {
      features: {
        enable_course_annual_unlock: {
          defaultValue: true,
        },
        simplified_create_group: {
          defaultValue: false,
          rules: [
            {
              coverage: 1,
              hashAttribute: "id",
              seed: "4764ca8b-f3a1-41ae-8b10-a574c5705524",
              hashVersion: 2,
              variations: [false, true],
              weights: [0.5, 0.5],
              key: "simplified-create-group",
              meta: [
                {
                  key: "0",
                  name: "Control",
                },
                {
                  key: "1",
                  name: "Simplified Create Group",
                },
              ],
              phase: "0",
              name: "Simplified Create Group",
            },
          ],
        },
        skool_games_cybertruck_video: {
          defaultValue: false,
          rules: [
            {
              coverage: 1,
              hashAttribute: "clientId",
              bucketVersion: 1,
              seed: "350c5cfd-cf74-449f-b036-8b45f52d976c",
              hashVersion: 2,
              variations: [false, true],
              weights: [0.5, 0.5],
              key: "skool_games_cybertruck_video",
              meta: [
                {
                  key: "control",
                  name: "Control",
                },
                {
                  key: "cybertruck_video",
                  name: "Cybertruck Video",
                },
              ],
              phase: "0",
              name: "Skool Games - Cybertruck Video",
            },
          ],
        },
      },
      experiments: [],
    },
  },
  __N_SSP: true,
};
