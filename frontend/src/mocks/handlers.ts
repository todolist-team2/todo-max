import { rest } from "msw";

export const handlers = [
  // 전체 카드 목록 불러오기
  rest.get('/api/cards', async(req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allData));
  })

  // 카드 추가

  // 카드 삭제

  // 카드 수정

  // 카드 이동
];

const allData = [
  {
    "categoryId": 1,
    "categoryName": "todo",
    "cards": [
      {
        "id": 1,
        "title": "title1",
        "content": "content",
        "nickname": "nickname"
      },
      {
        "id": 2,
        "title": "title2",
        "content": "content2",
        "nickname": "nickname2"
      }
    ]
  },
  {
    "categoryId": 2,
    "categoryName": "doing",
    "cards": [
      {
        "id": 1,
        "title": "title1",
        "content": "content",
        "nickname": "nickname"
      },
      {
        "id": 2,
        "title": "title2",
        "content": "content2",
        "nickname": "nickname2"
      }
    ]
  }
]
