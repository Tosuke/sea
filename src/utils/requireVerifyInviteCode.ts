import { RouterContext } from "@koa/router"
import { UserSession } from "../db/entities/userSession"

export function requireVerifyInviteCode<StateT extends { session?: UserSession }, CustomT>(
    ctx: RouterContext<StateT, CustomT>,
    next: () => Promise<void>
) {
    if (ctx.state.session == null) {
        ctx.status = 400
        ctx.body = `<!DOCTYPE html><meta charset="UTF-8"><a href="/login">/login</a> でログインしてね`
        return
    }
    return next()
}
