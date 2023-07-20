import { rest } from "msw";

export const handlers = [
  // 카테고리별 카드 목록 불러오기
  rest.get("/api/cards", async (req, res, ctx) => {
    const categoryId = req.url.searchParams.get("categoryId");
    if (!categoryId) {
      return res(ctx.status(200), ctx.json(allData));
    }

    const numberCategoryId = parseInt(categoryId);

    if (isNaN(numberCategoryId)) {
      return res(
        ctx.status(400),
        ctx.json({ error: "categoryId must be numeric" })
      );
    }

    const categoryIndex = allData.findIndex(
      (column) => column.categoryId === numberCategoryId
    );

    if (categoryIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: "categoryId not found" }));
    }

    return res(ctx.status(200), ctx.json(allData[categoryIndex]));
  }),

  // 카드 추가(등록)
  rest.post<{ title: string; content: string }>(
    "/api/cards",
    async (req, res, ctx) => {
      const categoryId = req.url.searchParams.get("categoryId");
      if (!categoryId) {
        return res(
          ctx.status(400),
          ctx.json({ error: "categoryId is required" })
        );
      }
      const numberCategoryId = parseInt(categoryId);
      const category = allData.find(
        (category) => category.categoryId === numberCategoryId
      );

      if (!category) {
        return res(
          ctx.status(400),
          ctx.json({ error: "categoryId is invalid" })
        );
      }

      const { title, content } = req.body;
      if (!title || !content) {
        return res(
          ctx.status(400),
          ctx.json({ error: "title or content is required" })
        );
      }

      const newCardId = generateUniqueId();


      category.cards = [
        {
          id: newCardId,
          title,
          content,
          nickname: "unknown",
        },
        ...category.cards,
      ];

      return res(ctx.status(200), ctx.json({ cardId: newCardId }));
    }
  ),

  // 카드 삭제
  rest.delete("/api/cards/:cardId", async (req, res, ctx) => {
    const { cardId } = req.params;
    if (!cardId) {
      return res(ctx.status(400), ctx.json({ error: "cardId is required" }));
    }

    if (typeof cardId !== "string") {
      return res(ctx.status(400), ctx.json({ error: "cardId is invalid" }));
    }

    const numberCardId = parseInt(cardId);
    const category = allData.find((category) =>
      category.cards.some((card) => card.id === numberCardId)
    );

    if (!category) {
      return res(ctx.status(400), ctx.json({ error: "cardId is invalid" }));
    }

    category.cards = category.cards.filter((card) => card.id !== numberCardId);

    return res(ctx.status(200), ctx.json({}));
  }),

  // 카드 수정
  rest.put<{ title: string; content: string }>(
    "/api/cards/:cardId",
    async (req, res, ctx) => {
      const { cardId } = req.params;

      if (!cardId) {
        return res(ctx.status(400), ctx.json({ error: "cardId is required" }));
      }

      if (typeof cardId !== "string") {
        return res(
          ctx.status(400),
          ctx.json({ error: "typeof cardId is invalid(not string)" })
        );
      }

      const { title, content } = req.body;
      if (!title || !content) {
        return res(
          ctx.status(400),
          ctx.json({ error: "title or content is required" })
        );
      }

      const numberCardId = parseInt(cardId);
      const category = allData.find((category) =>
        category.cards.some((card) => card.id === numberCardId)
      );

      if (!category) {
        return res(
          ctx.status(400),
          ctx.json({
            error: "category doesn't exist which contains card having cardId",
          })
        );
      }

      const cardIndex = category.cards.findIndex(
        (card) => card.id === numberCardId
      );
      if (cardIndex === -1) {
        return res(ctx.status(400), ctx.json({ error: "card is not found" }));
      }

      category.cards[cardIndex] = {
        ...category.cards[cardIndex],
        title,
        content,
      };

      return res(ctx.status(200), ctx.json(category.cards[cardIndex]));
    }
  ),

  // 카드 이동
  rest.patch<{ fromPrevCardId: number; toCategoryId: number; toPrevCardId: number }>("/api/cards/:cardId", async (req, res, ctx) => {
    const { cardId } = req.params;

    // cardId로 기존 카드 찾기
    if (!cardId) {
      return res(ctx.status(400), ctx.json({ error: "cardId is required" }));
    }

    if (typeof cardId !== "string") {
      return res(ctx.status(400), ctx.json({ error: "typeof cardId is invalid(not string)" }));
    }

    const numberCardId = parseInt(cardId);

    const fromCategory = allData.find((category) => category.cards.some((card) => card.id === numberCardId));

    if (!fromCategory) {
      return res(ctx.status(400), ctx.json({ error: "category doesn't exist which contains card having cardId" }));
    }

    const fromCardIndex = fromCategory.cards.findIndex((card) => card.id === numberCardId);

    if (fromCardIndex === -1) {
      return res(ctx.status(400), ctx.json({ error: "card is not found" }));
    }

    const { fromPrevCardId, toCategoryId, toPrevCardId } = req.body;

    // toCategoryId로 카테고리 찾기
    if (typeof toCategoryId !== "number") {
      return res(ctx.status(400), ctx.json({ error: "typeof toCategoryId is invalid(not number)" }));
    }

    const toCategory = allData.find((category) => category.categoryId === toCategoryId);

    if (!toCategory) {
      return res(ctx.status(400), ctx.json({ error: "toCategory is not found" }));
    }

    // toPrevCardId로 카드 찾기
    if (typeof toPrevCardId !== "number") {
      return res(ctx.status(400), ctx.json({ error: "typeof toPrevCardId is invalid(not number)" }));
    }

    const toCardIndex = toCategory.cards.findIndex((card) => card.id === toPrevCardId) + 1;

    // fromPrevCardId로 카드 찾기
    if (typeof fromPrevCardId !== "number") {
      return res(ctx.status(400), ctx.json({ error: "typeof fromPrevCardId is invalid(not number)" }));
    }

    const fromPrevCardIndex = fromCategory.cards.findIndex((card) => card.id === fromPrevCardId) + 1;

    if (fromPrevCardIndex === -1 && fromPrevCardId !== 0) {
      return res(ctx.status(400), ctx.json({ error: "fromPrevCard is not found" }));
    }

    // 카드 이동 로직
    toCategory.cards.splice(toCardIndex, 0, fromCategory.cards.splice(fromCardIndex, 1)[0]);

    return res(ctx.status(200), ctx.json({}));
  })
  
  rest.get("/api/actions", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(actions));
  }),
  
  rest.delete("/api/actions", async (req, res, ctx) => {
    actions.splice(0, actions.length);
    return res(ctx.status(200), ctx.json(actions));
  }),
];

function generateUniqueId() {
  const characters = "0123456789";
  const length = 8;
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return parseInt(id);
}

const allData = [
  {
    categoryId: 1,
    categoryName: "todo",
    cards: [
      {
        id: 1,
        title: "title1",
        content: "content",
        nickname: "nickname",
      },
      {
        id: 2,
        title: "title2",
        content: "content",
        nickname: "nickname",
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: "doing",
    cards: [
      {
        id: 3,
        title: "title3",
        content: "content",
        nickname: "nickname",
      },
      {
        id: 4,
        title: "title4",
        content: "content",
        nickname: "nickname",
      },
    ],
  },
  {
    categoryId: 3,
    categoryName: "done",
    cards: [],
  },
];

const actions = [
  {
    nickname: "bruni",
    imageUrl:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg",
    actionName: "등록",
    cardName: "변경전 타이틀",
    originCategoryName: "to-do",
    createdAt: "2023-07-20T05:13:14",
  },
  {
    nickname: "bruni",
    imageUrl:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg",
    actionName: "수정",
    cardName: "변경후 타이틀",
    createdAt: "2023-07-20T05:13:15",
  },
  {
    nickname: "bruni",
    imageUrl:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg",
    actionName: "삭제",
    cardName: "타이틀",
    createdAt: "2023-07-20T05:13:16",
  },
  {
    nickname: "bruni",
    imageUrl:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg",
    actionName: "이동",
    cardName: "타이틀",
    originCategoryName: "to-do",
    targetCategoryName: "to-do",
    createdAt: "2023-07-20T05:13:17",
  },
];
