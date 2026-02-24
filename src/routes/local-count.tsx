import { LocalCounterPage } from '@/features/local-counter/pages/LocalCounterPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/local-count')({
	component: LocalCounterPage,
});
