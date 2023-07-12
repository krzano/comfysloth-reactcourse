import React, { useState } from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';
import { BsFilter } from 'react-icons/bs';

const ProductsPage = () => {
	const [showFilters, setShowFilters] = useState(false);
	return (
		<main>
			<PageHero title='products' />
			<Wrapper className='page'>
				<div className='section-center products'>
					<button
						className='filters-btn'
						onClick={() => {
							setShowFilters(!showFilters);
						}}>
						<span>{showFilters ? 'hide' : 'show'}</span> filters <BsFilter />
					</button>
					<div className={showFilters ? '' : 'hidden'}>
						<Filters />
					</div>
					<div>
						<Sort />
						<ProductList />
					</div>
				</div>
			</Wrapper>
		</main>
	);
};

const Wrapper = styled.div`
	.products {
		display: grid;
		gap: 3rem 1.5rem;
		margin: 4rem auto;
	}
	.hidden {
		display: none;
	}
	.filters-btn {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.25rem 0.5rem;
		margin-top: 0;
		width: 180px;
		border-radius: var(--radius);
		border: 1px solid var(--clr-grey-6);
		background: transparent;
		/* border: transparent; */
		/* background: var(--clr-grey-10); */
		color: var(--clr-grey-1);
		letter-spacing: 1px;
		text-transform: uppercase;
		opacity: 0.7;
		cursor: pointer;
		svg {
			font-size: 30px;
		}
	}
	.filters-btn:hover {
		opacity: 0.9;
	}
	@media (min-width: 768px) {
		.products {
			grid-template-columns: 200px 1fr;
		}
		.filters-btn {
			display: none;
		}
		.hidden {
			display: block;
		}
	}
`;

export default ProductsPage;
