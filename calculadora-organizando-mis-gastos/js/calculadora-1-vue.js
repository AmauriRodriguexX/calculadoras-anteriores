Vue.component('app-buttons-list', {
	props: ['xrender'],
	template: `
	<div>
		<div class="wrapper__calc__mask__section__expenses" v-show="!showList">

            <div class="wrapper__calc__mask__section__expenses__button" @click="showListBtns">
                <div class="wrapper__calc__mask__section__expenses__button__img">
                    <img src="assets/btn-icon-plus.png">
                </div>
            </div>

            <div class="wrapper__calc__mask__section__expenses__text wrapper__calc__mask__section__expenses__text_cursor" @click="showListBtns">
                Agregar gasto
            </div>

        </div>
		<div class="wrapper__calc__mask__section__expenses__list" v-show="showList" v-if="xrender">
			<app-button-list-card  v-for="(exp, index) in expenses"
				:key="index"
				:title="exp.title"
				:code="exp.code"
				:image="exp.image"
				:imageHover="exp.imageHover"
				:examples="exp.examples"
				:gtm="exp.gtm">
			</app-button-list-card>
		</div>
	</div>
	`,
	data: function() {
		return {
			expenses: [
				{
					title: 'Renta',
					code: 'renta',
					image: 'assets/btn-icon-rent.png',
					imageHover: 'assets/btn-icon-rent-white.png',
					examples: 'Vivienda, negocio, etc.',
					selected: false,
					gtm: 'vkt-renta'
				},
				{
					title: 'Comidas',
					code: 'comidas',
					image: 'assets/btn-icon-food.png',
					imageHover: 'assets/btn-icon-food-white.png',
					examples: 'Taquitos, tortas, restaurantes, etc.',
					selected: false,
					gtm: 'vkt-comidas'
				},
				{
					title: 'Pago de servicios',
					code: 'servicios',
					image: 'assets/btn-icon-services.png',
					imageHover: 'assets/btn-icon-services-white.png',
					examples: 'Luz, agua, teléfono, etc.',
					selected: false,
					gtm: 'vkt-pago-de-servicios'
				},
				{
					title: 'Educación',
					code: 'educacion',
					image: 'assets/btn-icon-education.png',
					imageHover: 'assets/btn-icon-education-white.png',
					examples: 'Útiles, papelería, uniformes, etc.',
					selected: false,
					gtm: 'vkt-educacion'
				},
				{
					title: 'Transporte',
					code: 'transporte',
					image: 'assets/btn-icon-transport.png',
					imageHover: 'assets/btn-icon-transport-white.png',
					examples: 'Camiones, taxi, gasolina, etc.',
					selected: false,
					gtm: 'vkt-transporte'
				},
				{
					title: 'Pago de créditos',
					code: 'creditos',
					image: 'assets/btn-icon-credit.png',
					imageHover: 'assets/btn-icon-credit-white.png',
					examples: 'Bancarios, auto, vivienda, etc.',
					selected: false,
					gtm: 'vkt-pago-de-creditos'
				},
				{
					title: 'Despensa',
					code: 'despensa',
					image: 'assets/btn-icon-food2.png',
					imageHover: 'assets/btn-icon-food2-white.png',
					examples: 'Carne, verduras, frutas, etc.',
					selected: false,
					gtm: 'vkt-despensa'
				},
				{
					title: 'Diversión',
					code: 'diversion',
					image: 'assets/btn-icon-funny.png',
					imageHover: 'assets/btn-icon-funny-white.png',
					examples: 'Cine, excursiones, fiestas, etc.',
					selected: false,
					gtm: 'vkt-diversion'
				},
				{
					title: 'Ropa',
					code: 'ropa',
					image: 'assets/btn-icon-clothes.png',
					imageHover: 'assets/btn-icon-clothes-white.png',
					examples: 'Calzado, blusas, pantalones, etc.',
					selected: false,
					gtm: 'vkt-ropa'
				},
				{
					title: 'Cuidado personal',
					code: 'personal',
					image: 'assets/btn-icon-care.png',
					imageHover: 'assets/btn-icon-care-white.png',
					examples: 'Shampoo, pasta de dientes, papel higiénico, etc.',
					selected: false,
					gtm: 'vkt-cuidado-personal'
				},
				{
					title: 'Salud',
					code: 'salud',
					image: 'assets/btn-icon-health.png',
					imageHover: 'assets/btn-icon-health-white.png',
					examples: 'Medicinas, consultas médicas, etc.',
					selected: false,
					gtm: 'vkt-salud'
				},
				{
					title: 'Gastos hormiga',
					code: 'hormiga',
					image: 'assets/btn-icon-hormiga.png',
					imageHover: 'assets/btn-icon-hormiga-white.png',
					examples: 'Café, botanas, refrescos, etc.',
					selected: false,
					gtm: 'vkt-gastos-hormiga'
				}
			],
			arrGastos: this.$parent.arrExpenses,
			showList: false
		}
	},
	methods: {
		addArrExpenses(obj) {
			this.$parent.arrExpenses.push(obj);
			this.$parent.renderResultItemsComp = true;
			this.showList = false;
		},
		removeArrExpenses(code) {
			var expenses = this.$parent.arrExpenses;
			for (i=0; i<expenses.length; i++) {
				if (expenses[i]['code'] == code) {
					this.$parent.arrExpenses.splice(i,1);
					break;
				}
			}
		},
		showHideItemsStep_2() {
			// this.$parent.showButtonsList = false;
			this.$parent.showItemsStep2 = true;
		},
		showListBtns() {
			this.showList = true;
			this.$parent.showItemsStep2 = false;
		}
	}
});

Vue.component('app-button-list-card', {
	props: ['title', 'code', 'image', 'imageHover', 'examples', 'gtm'],
	template: `
		<div>
            <div class="wrapper__calc__mask__section__expenses__list__button" @click="addExpense" @mouseover="showHover" @mouseleave="hideHover" :title="examples" v-show="!seleccionado">
                <div class="wrapper__calc__mask__section__expenses__list__button__img"  :class="bgHover">
                    <img :src="btnImg" :class="gtm">
                </div>
                <div class="wrapper__calc__mask__section__expenses__list__button__text">
                    {{ title }}
                </div>
            </div>
		</div>
	`,
	methods: {
		addExpense() {
			var obj = { name: this.$props.title, code: this.$props.code, image: this.$props.image }
			this.$parent.addArrExpenses(obj);
			this.$parent.showHideItemsStep_2();
			this.seleccionado = true;
		},
		showHover() {
			if (this.isSelected == false) {
				this.bgHover = 'wrapper__calc__left__container__button__img_hover';
				this.btnImg = this.$props.imageHover;
			}
		},
		hideHover() {
			if (this.isSelected == false) {
				this.bgHover = '';
				this.btnImg = this.$props.image;
			}
		}
	},
	data() {
		return {
			bgHover: '',
			bgSelected: '',
			btnImg: this.$props.image,
			isSelected: false,
			seleccionado: false
		}
	}
});

Vue.component('app-result-list-item', {
	props: ['name', 'code', 'image'],
	template: `
		<div>
			<div class="wrapper__calc__mask__section__expenses">

	            <div class="wrapper__calc__mask__section__expenses__button">
	                <div class="wrapper__calc__mask__section__expenses__button__img">
	                    <img :src="image">
	                </div>
	            </div>

	            <div class="wrapper__calc__mask__section__expenses__field">
	                <input type="text" v-model="quantity" v-on:keyup="updateTotalExpenses" v-on:blur="itemBlur" @click="itemClick" @keyup.enter="$event.target.blur()" :id="code" :placeholder="'Ej: 2000'">
	                <div class="itemErrMsg" v-show="showItemErrorMsg"> {{ txtItemErrorMsg }}</div>
	            </div>

	        </div>
	    </div>
	`,
	data() {
		return {
			quantity: '',
			showItemErrorMsg: false,
			txtItemErrorMsg: ''
		}
	},
	methods: {
		updateTotalExpenses() {
			var total = 0;
			var expenses = this.$parent.arrExpenses;
			console.log('suma');
			for (i=0; i<expenses.length; i++) {
				var code = expenses[i]['code'];
				var monto = accounting.unformat(document.getElementById(code).value, ".")
				var parseMonto = parseFloat(monto);
				if (!isNaN(parseMonto)) {
					total += parseMonto;
				}
				console.log(code + ', ' + monto + ', ' + total);
			}

			this.$parent.totalExpenses = total;
		},
		itemBlur() {

			if (this.quantity != '') {
				var isNumber = this.isNumeric(this.quantity);

				if (isNumber) {
					if (this.quantity >= 0) {
						this.quantity = accounting.formatMoney(this.quantity, "$", 2, ",", ".");
					} else {
						this.txtItemErrorMsg = 'Escribe un número';
						this.showItemErrorMsg = true;
					}
				} else {
					this.txtItemErrorMsg = 'Escribe un número';
					this.showItemErrorMsg = true;
				}
			}
		},
		itemClick() {
			if (this.quantity != '') {
				this.quantity = accounting.unformat(this.quantity, ".");
			}
			this.showItemErrorMsg = false;
		},
		isNumeric: function (n) {
      		return !isNaN(parseFloat(n)) && isFinite(n);
    	},
    	deleteItem() {

    		var total = 0;
    		var expenses = this.$parent.arrExpenses;

			for (i=0; i<expenses.length; i++) {
				if (expenses[i]['code'] == this.code) {
					this.$parent.arrExpenses.splice(i,1);
					break;
				}
			}

			// this.$parent.totalExpenses = total;
			this.updateTotalExpenses();

    	}
	}
});

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    return accounting.formatMoney(value, "$", 2, ",", ".");
});

var app = new Vue({
	el: '#content',
	data: {
		totalExpenses: 0,
		arrExpenses: [],
		earnings: '',
		showErrorMsg: false,
		txtErrorMsg: '',
		resPositive: false,
		resNegative: false,
		resNeutro: false,
		showTxtPositive: false,
		showTxtNegative: false,
		showTxtNeutro: false,
		result: 0,
		showResultBox: false,
		lnkFb: '',
		showButtonsContainer: true,
		isChartCreated: false,
		objChart: null,
		renderButtonsContainerComp: true,
		renderResultItemsComp: true,
		showResetCalcBtn: false,
		showUpdateBalanceBtn: false,
		showGetBalanceBtn: true,
		slideClass: '',
		btnClass1: 'wrapper__calc__left__slider-buttons__item_selected',
		btnClass2: '',
		btnClass3: '',
		mainSlideClass: '',
		showButtonsList: false,
		showItemsStep2: true,
		btnListKey: 0,
		showSteps2: false,
		showSteps3: false,
		isEarningsValid: false
	},
	computed: {
		getTotalExpenses() {
			return this.totalExpenses;
		}
	},
	methods: {
		clickDreams(){
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'Alcanzando mis sueños',
				'CDFunnel': 'Organizando mis gastos',
				'CDValue': 'step_4'
			});
		},
		clickAnt(){
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'Gastos hormiga',
				'CDFunnel': 'Organizando mis gastos',
				'CDValue': 'step_4'
			});
		},
		clickBlog(){
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'ir al blog',
				'CDFunnel': 'Organizando mis gastos',
				'CDValue': 'step_4'
			});
		},
		nextStep() {

			this.showErrorMsg = false;

			this.earningsBlur();

			if (this.isEarningsValid == false) {

				this.txtErrorMsg = 'Escribe un número para los ingresos mensuales';
				this.showErrorMsg = true;

			} else {

				this.showSteps2 = true;
				this.mainSlideClass = 'wrapper__calc__mask__container_step2';
				this.showErrorMsg = false;
				
				dataLayer.push({
					'event': 'edufin-calculadoras',
					'CDAction': '01. Ingresos mensuales',
					'CDLabel': this.earnings,
					'CDFunnel': 'Organizando mis gastos',
					'CDValue': 'step_1'
				});

			}

		},
		resetCalc() {

			this.renderButtonsContainerComp = false;
			this.renderResultItemsComp = false;

        	this.$nextTick(() => {
          		this.renderButtonsContainerComp = true;
          		this.renderResultItemsComp = true;
        	});

        	this.showResultBox = false;

        	this.arrExpenses = [];
        	this.totalExpenses = 0;
        	this.earnings = '';
        	this.isEarningsValid = false;
        	this.showSteps2 = false;
        	this.showSteps3 = false;

        	this.showResetCalcBtn = false;
			this.showGetBalanceBtn = true;
			this.showUpdateBalanceBtn = false;

			this.mainSlideClass = 'wrapper__calc__mask__container_step1';

			var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);

		},
		getBalance() {

			this.showErrorMsg = false;

			this.resPositive = false;
			this.resNegative = false;
			this.resNeutro = false;
			this.showTxtPositive = false;
			this.showTxtNegative = false;
			this.showTxtNeutro = false;

			if (this.arrExpenses.length == 0) {
				this.txtErrorMsg = 'Debe seleccionar al menos un concepto de gasto.';
				this.showErrorMsg = true;
				return;
			}

			var expenses = this.arrExpenses;
			for (i=0; i<expenses.length; i++) {
				var monto = document.getElementById(expenses[i]['code']).value;
				if (monto == '') {
					this.txtErrorMsg = "Escriba un número en " + expenses[i]['name'];
					this.showErrorMsg = true;
					return;
				}
				dataLayer.push({
					'event': 'edufin-calculadoras',
					'CDAction': '02. Gastos',
					'CDLabel':  expenses[i]['name'],
					'CDFunnel': 'Organizando mis gastos',
					'CDValue': 'step_2',
					'spec_1': monto
				  });
			}

			var earnings = accounting.unformat(this.earnings);
			var totalExpenses = accounting.unformat(this.totalExpenses);

			this.result = earnings - totalExpenses;

			this.showSteps3 = true;
			const lblRes = '';

			if (this.result == 0) {
				lblRes = 'Neutro';
				this.resNeutro = true;
				this.showTxtNeutro = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-organizando-mis-gastos/neutro.html';
			} else if (this.result > 0) {
				lblRes = 'Positivo';
				this.resPositive = true;
				this.showTxtPositive = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-organizando-mis-gastos/positivo.html';
			} else if (this.result < 0) {
				lblRes = 'Negativo';
				this.resNegative = true;
				this.showTxtNegative = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-organizando-mis-gastos/negativo.html';
			}

			this.showResultBox = true;
			this.showResetCalcBtn = true;

			this.showGetBalanceBtn = false;
			this.showUpdateBalanceBtn = true;

			var expenses = this.arrExpenses;
			var labels = [];
			var series = [];

			for (i=0; i<expenses.length; i++) {
				var name = expenses[i]['name'];
				var code = expenses[i]['code'];
				var monto = accounting.unformat(document.getElementById(code).value, ".")
				var parseMonto = parseFloat(monto);

				labels.push(name);
				series.push(parseMonto);
			}

			// options.labels = ['Titulo 1', 'Titulo 2', 'Titulo 3', 'Titulo 4', 'Titulo 8'];
			options.labels = labels;
			options.series = series;

			if (this.isChartCreated) {

				this.objChart.destroy();

				this.objChart = new ApexCharts(
	            	qrySelector,
	            	options
	        	);

	        	this.objChart.render();

			} else {

				this.isChartCreated = true;

				this.objChart = new ApexCharts(
	            	qrySelector,
	            	options
	        	);

	        	this.objChart.render();

	        	/*
	        	var etop = jQuery('#ebook').offset().top;
				jQuery('html, body').animate({
				  scrollTop: etop
				}, 1000);
				*/

			}

			this.mainSlideClass = 'wrapper__calc__mask__container_step-final';
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '03. Resultados',
				'CDLabel': lblRes,
				'CDFunnel': 'Organizando mis gastos',
				'CDValue': 'step_3'
			  });

		},
		earningsBlur() {

			if (this.showSteps2) {
				return;
			}

			if (this.earnings != '') {
				var isNumber = this.isNumeric(this.earnings);

				if (isNumber) {
					if (this.earnings >= 0) {
						this.earnings = accounting.formatMoney(this.earnings, "$", 2, ",", ".");
						this.isEarningsValid = true;
					} else {
						this.txtErrorMsg = 'Escribe un número para los ingresos mensuales';
						this.showErrorMsg = true;
					}
				} else {
					this.txtErrorMsg = 'Escribe un número para los ingresos mensuales3';
					this.showErrorMsg = true;
				}
			}

		},
		earningsClick() {
			if (this.earnings != '' && this.isEarningsValid) {
				this.earnings = accounting.unformat(this.earnings, ".");
			}
			this.isEarningsValid = false;
			this.showErrorMsg = false;
		},
		formatCurrency(value) {
			var formatter = new Intl.NumberFormat('es-MX', {
		        style: 'currency',
		        currency: 'MXN',
		        minimumFractionDigits: 2
		    });
		    return formatter.format(value);
		},
		isNumeric: function (n) {
      		return !isNaN(parseFloat(n)) && isFinite(n);
    	},
    	moveSlide1() {
    		this.slideClass = 'wrapper__calc__left__slider-buttons__item_b1';
    		this.btnClass1 = 'wrapper__calc__left__slider-buttons__item_selected';
    		this.btnClass2 = '';
    		this.btnClass3 = '';
    	},
    	moveSlide2() {
    		this.slideClass = 'wrapper__calc__left__slider-buttons__item_b2';
    		this.btnClass1 = '';
    		this.btnClass2 = 'wrapper__calc__left__slider-buttons__item_selected';
    		this.btnClass3 = '';
    	},
    	moveSlide3() {
    		this.slideClass = 'wrapper__calc__left__slider-buttons__item_b3';
    		this.btnClass1 = '';
    		this.btnClass2 = '';
    		this.btnClass3 = 'wrapper__calc__left__slider-buttons__item_selected';
    	},
    	showHideButtonsList() {
    		this.btnListKey = this.btnListKey + 1;
    		this.showButtonsList = true;
    		this.showItemsStep2 = false;
    	}
	}
});
