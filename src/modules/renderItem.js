import { API_URI } from './var';
import Swiper, { Thumbs, Scrollbar, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { list } from 'postcss';

const createCardImageSlider = (largeImages) => {
	const cardImageSlider = document.createElement('ul');
	cardImageSlider.className = 'swiper-wrapper';

	const cardImageSliders = largeImages.map((url) => {
		const li = document.createElement('li');
		li.className = 'swiper-slide';
		const img = new Image();
		img.src = `${API_URI}${url}`;
		li.append(img);
		return li;
	});
	cardImageSlider.append(...cardImageSliders);
	return cardImageSlider;
};

const createCardImageThumbSlider = (smallImages) => {
	const cardImageSlider = document.createElement('ul');
	cardImageSlider.className = 'swiper-wrapper';

	const cardImageSliders = smallImages.map((url) => {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.className = 'card__thumb-btn';
		li.className = 'swiper-slide';
		const img = new Image();
		img.src = `${API_URI}${url}`;
		button.append(img);
		li.append(button);
		return li;
	});
	cardImageSlider.append(...cardImageSliders);
	return cardImageSlider;
};

const createParams = (params) => {
	const list = [];
	for (const key in params) {
		const li = document.createElement('li');
		li.className = 'card__params-item';
		li.innerHTML = `
      <span>${key}:</span>
      <span>${params[key]}</span>
    `;

		list.push(li);
	}
	return list;
};

const createDescription = (descriptions) => {
	const list = [];
	for (const description of descriptions) {
		const p = document.createElement('p');

		p.innerHTML = description;

		list.push(p);
	}
	return list;
};

export const renderItem = (item) => {
	const cardImage = document.querySelector('.card__image');

	cardImage.append(createCardImageSlider(item.images.large));

	const cardSliderThumb = document.querySelector('.card__slider-thumb');

	const swiperScrollBar = document.createElement('div');
	swiperScrollBar.className = 'swiper-scrollbar';
	cardSliderThumb.append(createCardImageThumbSlider(item.images.small), swiperScrollBar);

	const cardTitle = document.querySelector('.card__title');
	cardTitle.textContent = item.title;
	const cardVendorCode = document.querySelector('.card__vendor-code');
	cardVendorCode.textContent = `Артикул: ${item.id}`;
	const cardPrice = document.querySelector('.card__price');
	cardPrice.textContent = new Intl.NumberFormat('ru-Ru', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(item.price);
	const cardAddCart = document.querySelector('.card__add-cart');
	cardAddCart.dataset.idGoods = item.id;

	const cardParamsList = document.querySelector('.card__params-list');
	cardParamsList.append(...createParams(item.characteristic));

	const cardDescriptionText = document.querySelector('.card__description-text');
	cardDescriptionText.append(...createDescription(item.description));

	const thumbSwiper = new Swiper(cardSliderThumb, {
		spaceBetween: 44,
		slidesPerView: 3,
		scrollbar: {
			el: swiperScrollBar,
			draggable: true,
			// dragClass: 'card__thumb-scroll',
		},
		modules: [Scrollbar],
	});

	new Swiper(cardImage, {
		spaceBetween: 10,
		slidesPerView: 1,
		thumbs: {
			swiper: thumbSwiper,
			slideThumbActiveClass: 'card__thumb-btn_active',
		},
		modules: [Thumbs],
	});
};
