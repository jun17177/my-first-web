import { test, expect } from '@playwright/test';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeAll(() => {
  if (!EMAIL || !PASSWORD) {
    throw new Error('TEST_EMAIL, TEST_PASSWORD 환경변수를 .env.local에 설정해주세요.');
  }
});

test('행복 경로: 로그인 → 글 작성 → 목록 확인', async ({ page }) => {
  const title = `E2E 테스트 글 ${Date.now()}`;

  // 로그인
  await page.goto('/login');
  await page.getByLabel('이메일').fill(EMAIL);
  await page.getByLabel('비밀번호').fill(PASSWORD);
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL('/posts');

  // 글 작성
  await page.goto('/posts/new');
  await page.getByLabel('제목').fill(title);
  await page.getByLabel('내용').fill('Playwright 자동 테스트로 작성한 내용입니다.');
  await page.getByRole('button', { name: '저장하기' }).click();
  await expect(page).toHaveURL('/posts');

  // 목록에서 새 글 확인
  await expect(page.getByText(title)).toBeVisible();
});

test('거절 경로: 비로그인 /posts/new → /login 리다이렉트', async ({ browser }) => {
  // 새 컨텍스트 = 쿠키 없는 완전 비로그인 상태
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/posts/new');
  await expect(page).toHaveURL('/login');

  await context.close();
});
