import { BetterAuthActionButton } from '@/components/auth/BetterAuthActionButton';
import { authClient } from '@/lib/auth-client';
import {
	SUPPORTED_OAUTH_PROVIDERS,
	SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from '@/lib/o-auth-provider';

export const SocialAuthButton = () => {
	return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
		const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].icon;
		return (
			<BetterAuthActionButton
				variant={'outline'}
				key={provider}
				action={() => {
					return authClient.signIn.social({
						provider,
						callbackURL: '/todos',
					});
				}}
			>
				<Icon />
				{SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
			</BetterAuthActionButton>
		);
	});
};
