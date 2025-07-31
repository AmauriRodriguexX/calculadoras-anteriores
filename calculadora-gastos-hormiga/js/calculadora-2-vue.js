Vue.component('app-button-card', {
	props: ['obj'],
	template: `
		<div>
            <div class="wrapper__calc__mask__section__expenses__list__button" :class="obj.gtm" @click="selectExpense" @mouseover="showHover" @mouseleave="hideHover" v-show="!obj.selected">
                <div class="wrapper__calc__mask__section__expenses__list__button__img" :class="bgHover">
                    <img :src="obj.image" v-show="!isHover">
                    <img :src="obj.imageHover" v-show="isHover">
                </div>
                <div class="wrapper__calc__mask__section__expenses__list__button__text">
                    {{ obj.name }}
                </div>
            </div>
		</div>
	`,
	methods: {
		selectExpense() {
			this.hideHover();
			this.$props.obj.selected = true;
			this.$props.obj.order = this.$parent.consecutive;
			this.$parent.showButtonsExpenses = false;
			this.$parent.consecutive++;
		},
		showHover() {
			if (window.screen.width > 500) {
				this.isHover = true;
				this.bgHover = 'wrapper__calc__left__container__button__img_hover';
			}
		},
		hideHover() {
			if (window.screen.width > 500) {
				this.isHover = false;
				this.bgHover = '';
			}
		}
	},
	data() {
		return {
			isHover: false,
			bgHover: '',
			btnImg: this.$props.obj.image
		}
	}
});

Vue.component('app-input-field', {
	props: ['obj'],
	template: `
		<div>
			<div class="wrapper__calc__mask__section__exp">
				<img :src="obj.image">
				{{ obj.name }}
			</div>
			<div class="wrapper__calc__mask__section__expenses">

	            <div class="wrapper__calc__mask__section__expenses__button wrapper__calc__mask__section__expenses__button_mt" :title="obj.title">
	                Diario
	            </div>

	            <div class="wrapper__calc__mask__section__expenses__field">
	                <input type="text" v-model="obj.amount" v-on:blur="itemBlur" @click="itemClick" @keyup.enter="$event.target.blur()">
	                <div class="itemErrMsg" v-show="txtErrorMsg"> {{ txtErrorMsg }}</div>
	            </div>

	            <div class="wrapper__calc__mask__section__expenses__delete" @click="removeItem">
	                <img src="assets/btn-icon-delete.png">
	            </div>

	        </div>

	        <div class="wrapper__calc__mask__section__expenses__period">
	        	<div class="wrapper__calc__mask__section__expenses__period__title">Semanal</div>
	        	<div class="wrapper__calc__mask__section__expenses__period__value"> {{ getSubtotalWeek | toCurrency }} </div>
	        </div>

	        <div class="wrapper__calc__mask__section__expenses__period">
	        	<div class="wrapper__calc__mask__section__expenses__period__title">Mensual</div>
	        	<div class="wrapper__calc__mask__section__expenses__period__value"> {{ getSubtotalMonth | toCurrency }} </div>
	        </div>

	        <div class="wrapper__calc__mask__section__expenses__period">
	        	<div class="wrapper__calc__mask__section__expenses__period__title">Anual</div>
	        	<div class="wrapper__calc__mask__section__expenses__period__value"> {{ getSubtotalYear | toCurrency }} </div>
	        </div>

	        <div class="wrapper__calc__mask__section__expenses__hr"></div>

	    </div>
	`,
	data() {
		return {
			txtErrorMsg: false,
			txtErrorMsg: '',
			semanal: 0
		}
	},
	computed: {
		getSubtotalWeek() {
			var subtotal = 0;

			if (this.$props.obj.amount != '') {
				var monto = accounting.unformat(this.$props.obj.amount)
				var parseMonto = parseFloat(monto);
				if (!isNaN(parseMonto)) {
					subtotal = parseMonto * 7;
				}

			}

			return subtotal;
		},
		getSubtotalMonth() {
			var subtotal = 0;

			if (this.$props.obj.amount != '') {
				var monto = accounting.unformat(this.$props.obj.amount)
				var parseMonto = parseFloat(monto);
				if (!isNaN(parseMonto)) {
					subtotal = parseMonto * 30;
				}

			}

			return subtotal;
		},
		getSubtotalYear() {
			var subtotal = 0;

			if (this.$props.obj.amount != '') {
				var monto = accounting.unformat(this.$props.obj.amount)
				var parseMonto = parseFloat(monto);
				if (!isNaN(parseMonto)) {
					subtotal = parseMonto * 365;
				}

			}

			return subtotal;
		}
	},
	methods: {
		itemBlur() {

			if (this.$props.obj.amount != '') {
				var isNumber = this.isNumeric(this.$props.obj.amount);
				if (isNumber) {
					if (this.$props.obj.amount >= 0) {
						this.$props.obj.amount = accounting.formatMoney(this.$props.obj.amount, "$", 2, ",", ".");
					} else {
						this.txtErrorMsg = 'Escribe un número';
						this.txtErrorMsg = true;
					}
				} else {
					this.txtErrorMsg = 'Escribe un número';
					this.txtErrorMsg = true;
				}
			}

		},
		itemClick() {
			if (this.$props.obj.amount != '') {
				this.$props.obj.amount = accounting.unformat(this.$props.obj.amount, ".");
			}
			this.txtErrorMsg = false;
			this.$parent.showErrorMsg = false;
		},
		isNumeric: function (n) {
      		return !isNaN(parseFloat(n)) && isFinite(n);
    	},
    	removeItem() {
    		this.$props.obj.order = 0;
    		this.$props.obj.selected = false;
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

		isEarningsValid: false,
		resAhorradora: false,
		resGastalona: false,
		resConsumidora: false,
		showTxtAhorradora: false,
		showTxtGastalona: false,
		showTxtConsumidora: false,
		showResultBox: false,
		showStep2: false,
		showStep3: false,
		showButtonsExpenses: false,
		showErrorMsg: false,
		txtErrorMsg: '',
		consecutive: 0,
		earnings: '',
		totalMonth: 0,
		result: 0,
		expenses: [
			{
				name: 'Dulces',
				code: 'dulces',
				image: 'assets/btn-icon-candy.png',
				imageHover: 'assets/btn-icon-candy-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-dulces',
				amount: '',
				order: 0
			},
			{
				name: 'Cafés',
				code: 'cafes',
				image: 'assets/btn-icon-coffee.png',
				imageHover: 'assets/btn-icon-coffee-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-cafes',
				amount: '',
				order: 0
			},
			{
				name: 'Propinas',
				code: 'propinas',
				image: 'assets/btn-icon-money.png',
				imageHover: 'assets/btn-icon-money-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-propinas',
				amount: '',
				order: 0
			},
			{
				name: 'Revistas',
				code: 'revistas',
				image: 'assets/btn-icon-magazine.png',
				imageHover: 'assets/btn-icon-magazine-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-revistas',
				amount: '',
				order: 0
			},
			{
				name: 'Helados',
				code: 'helados',
				image: 'assets/btn-icon-icecream.png',
				imageHover: 'assets/btn-icon-icecream-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-helados',
				amount: '',
				order: 0
			},
			{
				name: 'Cigarros',
				code: 'cigarros',
				image: 'assets/btn-icon-cigars.png',
				imageHover: 'assets/btn-icon-cigars-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-cigarros',
				amount: '',
				order: 0
			},
			{
				name: 'Refresco',
				code: 'refresco',
				image: 'assets/btn-icon-drink.png',
				imageHover: 'assets/btn-icon-drink-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-refresco',
				amount: '',
				order: 0
			},
			{
				name: 'Chocolates',
				code: 'chocolates',
				image: 'assets/btn-icon-chocolate.png',
				imageHover: 'assets/btn-icon-chocolate-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-chocolates',
				amount: '',
				order: 0
			},
			{
				name: 'Otros',
				code: 'otros',
				image: 'assets/btn-icon-other.png',
				imageHover: 'assets/btn-icon-other-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-otros',
				amount: '',
				order: 0
			}
		]
	},
	computed: {
		getTotalExpenses() {

			var total = 0;

			for (i=0; i<this.expenses.length; i++) {
				if (this.expenses[i].selected) {
					var monto = accounting.unformat(this.expenses[i].amount, ".")
					var parseMonto = parseFloat(monto);
					if (!isNaN(parseMonto)) {
						total += parseMonto;
					}
				}
			}

			return total;

		},
		getTotalExpensesWeek() {

			var total = 0;

			for (i=0; i<this.expenses.length; i++) {
				if (this.expenses[i].selected) {
					var monto = accounting.unformat(this.expenses[i].amount, ".")
					var parseMonto = parseFloat(monto);
					if (!isNaN(parseMonto)) {
						total += parseMonto * 7;
					}
				}
			}

			return total;

		},
		getTotalExpensesMonth() {

			var total = 0;

			for (i=0; i<this.expenses.length; i++) {
				if (this.expenses[i].selected) {
					var monto = accounting.unformat(this.expenses[i].amount, ".")
					var parseMonto = parseFloat(monto);
					if (!isNaN(parseMonto)) {
						total += parseMonto * 30;
					}
				}
			}

			this.totalMonth = total;

			return total;

		},
		getTotalExpensesYear() {

			var total = 0;

			for (i=0; i<this.expenses.length; i++) {
				if (this.expenses[i].selected) {
					var monto = accounting.unformat(this.expenses[i].amount, ".");
					var parseMonto = parseFloat(monto);
					if (!isNaN(parseMonto)) {
						total += parseMonto * 365;
					}
				}
			}

			return total;

		},
		orderSelExpenses() {
			return this.expenses.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
		}
	},
	methods: {
		nextStep() {

			this.earningsBlur();

			if (this.isEarningsValid == false) {

				this.txtErrorMsg = 'Escribe un número para los ingresos mensuales';
				this.showErrorMsg = true;

			} else {

				this.showStep2 = true;
				this.mainSlideClass = 'wrapper__calc__mask__container_step2';
				this.showErrorMsg = false;

				//edufin-calculadoras Calcular
				dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '01. Ingresos mensuales',
				'CDLabel': 'calcular',
				'CDFunnel': 'Calculadora Gastos Hormiga',
				'CDValue': 'step_1',
				'spec_1': this.earnings
				});
			}

		},
		clickOrg(){
			//edufin-calculadoras Clic botón
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'Organizando mis Gastos',
				'CDFunnel': 'Calculadora Gastos Hormiga',
				'CDValue': 'step_4'
			});

		},
		ClickDreans(){
			//edufin-calculadoras Clic botón
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'Alcanzando mis sueños',
				'CDFunnel': 'Calculadora Gastos Hormiga',
				'CDValue': 'step_4'
			});

		},
		resetCalc() {
			//edufin-calculadoras Clic botón
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': 'Clic botón',
				'CDLabel': 'reiniciar calculadora',
				'CDFunnel': 'Calculadora Gastos Hormiga',
				'CDValue': 'step_4'
			});
			for (i=0; i<this.expenses.length; i++) {
				this.expenses[i].selected = false;
				this.expenses[i].amount = '';
			}

			this.earnings = '';
			this.isEarningsValid = false;
			this.showResultBox = false;
			this.showStep2 = false;
			this.showStep3 = false;
			this.mainSlideClass = 'wrapper__calc__mask__container_step1';

			var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);

		},
		getBalance() {

			this.showErrorMsg = false;

			var isSelected = false;
			for (i=0; i<this.expenses.length; i++) {
				if (this.expenses[i].selected) {
					isSelected = true;
					if (this.expenses[i].amount == '') {
						this.txtErrorMsg = "Escriba un número en " + this.expenses[i]['name'];
						this.showErrorMsg = true;
						return;
					}
					
					//edufin-calculadoras Agregar gasto
					dataLayer.push({
						'event': 'edufin-calculadoras',
						'CDAction': '02. Agregar gasto',
						'CDLabel': this.expenses[i]['name'],
						'CDFunnel': 'Calculadora Gastos Hormiga',
						'CDValue': 'step_2',
						'spec_1': this.expenses[i].amount
					});
				}
			}

			if (!isSelected) {
				this.txtErrorMsg = 'Debe seleccionar al menos un gasto';
				this.showErrorMsg = true;
				return;
			}

			var earnings = accounting.unformat(this.earnings);
			var porcGastos = (this.totalMonth * 100) / earnings;
			var porcIngresos = 100 - porcGastos;
			// accounting.formatMoney(this.earnings, "$", 2, ",", ".");

			this.result = porcGastos.toFixed(0);

			this.showStep3 = true;
			this.resAhorradora = false;
			this.resGastalona = false;
			this.resConsumidora = false;
			this.showTxtAhorradora = false;
			this.showTxtGastalona = false;
			this.showTxtConsumidora = false;

			if (this.result <= 4) {
				this.resAhorradora = true;
				this.showTxtAhorradora = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-gastos-hormiga/ahorradora.html';
			} else if (this.result >= 5 && this.result <= 8) {
				this.resConsumidora = true;
				this.showTxtConsumidora = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-gastos-hormiga/consumidora.html';
			} else {
				this.resGastalona = true;
				this.showTxtGastalona = true;
				this.lnkFb = 'https://www.facebook.com/sharer/sharer.php?u=https://www.compartamos.com.mx/educacion-financiera/calculadora-gastos-hormiga/gastalona.html';
			}

			this.showResultBox = true;

			var labels = ['Tus ingresos', 'Tus gastos'];
			var series = [porcIngresos, porcGastos];

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

			}

			this.mainSlideClass = 'wrapper__calc__mask__container_step3';

			var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);
			
			//edufin-calculadoras Resultados
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '03. Resultados',
				'CDLabel': 'ahorradora',
				'CDFunnel': 'Calculadora Gastos Hormiga',
				'CDValue': 'step_3'
			});
		},
		earningsBlur() {

			if (this.showStep2) {
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
					this.txtErrorMsg = 'Escribe un número para los ingresos mensuales';
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
    	toggleButtonsExpenses() {
    		this.showErrorMsg = false;
    		this.showButtonsExpenses = true;

    		var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);
    	}
	}
});
