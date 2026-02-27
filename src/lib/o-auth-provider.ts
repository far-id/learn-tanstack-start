import { GithubIcon, GoogleIcon } from '@/components/auth/OAuthIcon'
import type { ComponentProps, ElementType } from 'react'

export const SUPPORTED_OAUTH_PROVIDERS = ['github', 'google'] as const
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number]

export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<SupportedOAuthProvider, { name: string, icon: ElementType<ComponentProps<'svg'>> }> = {
  github: {
    name: 'GitHub',
    icon: GithubIcon,
  },
  google: {
    name: 'Google',
    icon: GoogleIcon,
  },
}
