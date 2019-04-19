export const isProductionMode = process.env.NODE_ENV === "production"
if (isProductionMode === false) {
    console.warn("productionモードじゃないで")
}

const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY
if (RECAPTCHA_SITE_KEY == null) {
    if (isProductionMode) {
        throw "reCAPTCHAの設定がされていません。productionモードではreCAPTCHAは必須です。"
    } else {
        console.warn(
            "reCAPTCHAの設定がされていません。新規登録やログインのCSRF攻撃に対して脆弱です。"
        )
    }
}

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
if (RECAPTCHA_SITE_KEY != null && RECAPTCHA_SECRET_KEY == null) {
    console.error(
        "reCAPTCHAのサイトキーが指定されているのにシークレットキーが指定されていません。"
    )
    process.exit(1)
}

export const RECAPTCHA:
    | {
          SITE_KEY: string
          SECRET_KEY: string
      }
    | undefined =
    RECAPTCHA_SITE_KEY != null && RECAPTCHA_SECRET_KEY != null
        ? {
              SITE_KEY: RECAPTCHA_SITE_KEY,
              SECRET_KEY: RECAPTCHA_SECRET_KEY,
          }
        : undefined
