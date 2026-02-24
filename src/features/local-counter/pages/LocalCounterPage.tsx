import { Button } from '@/components/ui/button';
import { ClientOnly } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { loadCounterFn } from '../client';

export const LocalCounterPage = () => {
	return (
		<ClientOnly>
			<CounterComponent />
		</ClientOnly>
	);
};

function CounterComponent() {
	const [counter, setCounter] = useState(loadCounterFn);

	useEffect(() => {
		localStorage.setItem('counter', counter.toString());
	}, [counter]);

	return <Button onClick={() => setCounter((c) => c + 1)}>{counter}</Button>;
}
