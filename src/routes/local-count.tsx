import { Button } from '@/components/ui/button';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { createClientOnlyFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/local-count')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ClientOnly>
			<CounterComponent />
		</ClientOnly>
	);
}

function CounterComponent() {
	const [counter, setCounter] = useState(loadCounterFn);
	useEffect(() => {
		localStorage.setItem('counter', counter.toString());
	}, [counter]);

	return <Button onClick={() => setCounter((c) => c + 1)}>{counter}</Button>;
}

const loadCounterFn = createClientOnlyFn(() => {
	const storedCounter = localStorage.getItem('counter');
	return storedCounter ? Number.parseInt(storedCounter) : 0;
});
