'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useRecipesStore } from '@/providers/recipes-store-provider';
import { getRecipes } from '@/services/api';
import { RecipeItem } from '@/components/recipes/item';
import { cn } from '@/utils';
import { TypographyH4 } from '@/ui/typography';
import { SearchInput } from '@/ui/search-input';
import { RecipeSchema } from '@/types';

export default function Home() {
	const { push } = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');

	const { recipes, setRecipes } = useRecipesStore((state) => state);

	const [data, setData] = useState<RecipeSchema[]>([]);

	useEffect(() => {
		if (!query) setData(recipes);
		else
			setData(
				recipes.filter((recipe) =>
					recipe.name.toLowerCase().includes(query.toLowerCase())
				)
			);
	}, [query]);

	useEffect(() => {
		getRecipes().then((result) => {
			if (result.error || !result.recipes) {
				console.error(result.message);
				return;
			}
			setRecipes(result.recipes);
			setData(result.recipes);
		});
	}, []);

	return (
		<main className='flex flex-col items-center text-neutral-700 w-full'>
			<div
				className={cn(
					'sticky top-24 bg-[#fefff2] pt-5 w-full flex items-center justify-between'
				)}>
				<TypographyH4 className='ms-3'>RECIPES</TypographyH4>
				<SearchInput value={query} onQuery={(query) => setQuery(query)} />
			</div>
			{data.map((recipe) => (
				<div
					key={recipe.id}
					onClick={() => push(`/${recipe.slug}`, { scroll: true })}
					className='cursor-pointer'>
					{RecipeItem({ recipe })}
				</div>
			))}
		</main>
	);
}
