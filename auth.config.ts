import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    /*
    authorizedコールバックは、リクエストがNext.jsミドルウェア経由でページにアクセスすることを許可されているかどうかを確認するために使用します。リクエストが完了する前に呼び出され、auth プロパティと request プロパティを持つオブジェクトを受け取ります。authプロパティにはユーザーのセッションが含まれ、requestプロパティには受信したリクエストが含まれます。
    */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
