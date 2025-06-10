// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)

		// A1. Attach the shadow DOM to this Web Component (leave the mode open)
		this.shadow = this.attachShadow({ mode: 'open' });

		// A2. Create an <article> element - This will hold our markup once our data is set
		this.article = document.createElement('article');

		// A3. Create a style element - This will hold all of the styles for the Web Component
		this.styleElem = document.createElement('style');

		// A4. Insert all of the styles from cardTemplate.html into the <style> element
		this.styleElem.textContent = `
			* {
				font-family: sans-serif;
				margin: 0;
				padding: 0;
			}
			article {
				align-items: center;
				border: 1px solid rgb(223, 225, 229);
				border-radius: 8px;
				display: grid;
				grid-template-rows: 118px 56px 14px 18px 15px 36px;
				height: auto;
				row-gap: 5px;
				padding: 0 16px 16px 16px;
				width: 178px;
			}
			article > img {
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				height: 118px;
				object-fit: cover;
				margin-left: -16px;
				width: calc(100% + 32px);
			}
			p.title {
				display: -webkit-box;
				font-size: 16px;
				height: 36px;
				line-height: 18px;
				margin-top: 10px;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			p.title a {
				text-decoration: none;
				color: #000;
			}
			p.organization {
				color: black !important;
				font-size: 14px;
			}
			div.rating {
				align-items: center;
				column-gap: 5px;
				display: flex;
				font-size: 12px;
			}
			div.rating > span {
				display: flex;
				align-items: center;
			}
			time {
				color: #70757A;
				font-size: 12px;
			}
			p.ingredients {
				height: 32px;
				overflow: hidden;
				color: #70757A;
				font-size: 12px;
			}
		`;

		// A5. Append the <style> and <article> elements to the Shadow DOM
		this.shadow.appendChild(this.styleElem);
		this.shadow.appendChild(this.article);
	}

	/**
	 * Called when the .data property is set on this element.
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		// A6. Select the <article> we added to the Shadow DOM
		const article = this.article;

		// A7. Set the contents of the <article> using template literals and innerHTML
		article.innerHTML = `
			<img src="${data.imgSrc}" alt="${data.imgAlt}">
			<p class="title">
				<a href="${data.titleLnk}">${data.titleTxt}</a>
			</p>
			<p class="organization">${data.organization}</p>
			<div class="rating">
				<span>${.repeat(data.rating)}</span>
				<span>(${data.numRatings})</span>
			</div>
			<time>${data.lengthTime}</time>
			<p class="ingredients">
				${data.ingredients}
			</p>
		`;
	}
}

// A8. Define the Class as a customElement so that you can create 'recipe-card' elements
customElements.define('recipe-card', RecipeCard);
