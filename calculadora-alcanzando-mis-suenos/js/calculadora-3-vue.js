Vue.component('app-button-card', {
	props: ['obj'],
	template: `
		<div>
            <div class="wrapper__calc__mask__section__expenses__list__button" :class="obj.gtm" @click="selectExpense" @mouseover="showHover" @mouseleave="hideHover">
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

			
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '01. Clic botón - Seleccionar sueño',
				'CDLabel': this.$props.obj.name,
				'CDFunnel': 'Calculadora alcanzando mis sueños',
				'CDValue': 'step_1'
			});

			this.$props.obj.selected = true;
			this.$parent.isItemSelected = true;
			this.isHover = false;
			this.bgHover = '';

			this.$parent.dreamImg = this.$props.obj.image;
			this.$parent.dreamTxt = this.$props.obj.name;

			this.$parent.nextStep();

		},
		showHover() {
			if (window.screen.width > 500) {
				if (this.$props.obj.selected == false) {
					this.isHover = true;
					this.bgHover = 'wrapper__calc__left__container__button__img_hover';
				}
			}
		},
		hideHover() {
			if (window.screen.width > 500) {
				if (this.$props.obj.selected == false) {
					this.isHover = false;
					this.bgHover = '';
				}
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

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    return accounting.formatMoney(value, "$", 2, ",", ".");
});

var app = new Vue({
	el: '#content',
	data: {
		mainSlideClass: '',
		showResultBox: false,
		showStep2: false,
		showStep3: false,
		showErrorMsg: false,
		txtErrorMsg: '',
		result: 0,
		isItemSelected: false,
		amount: 40000,
		dreamImg: '',
		dreamTxt: '',
		time: 1,
		dayly: 0,
		monthly: 0,
		yearly: 0,
		expenses: [
			{
				name: 'Viaje',
				image: 'assets/btn-icon-travel.png',
				imageHover: 'assets/btn-icon-travel-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-viaje'
			},
			{
				name: 'Estudios',
				image: 'assets/btn-icon-study.png',
				imageHover: 'assets/btn-icon-study-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-estudios',
				amount: ''
			},
			{
				name: 'Ahorro',
				image: 'assets/btn-icon-money.png',
				imageHover: 'assets/btn-icon-money-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-ahorro',
				amount: ''
			},
			{
				name: 'Casa',
				image: 'assets/btn-icon-house.png',
				imageHover: 'assets/btn-icon-house-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-casa',
				amount: ''
			},
			{
				name: 'Negocio',
				image: 'assets/btn-icon-business.png',
				imageHover: 'assets/btn-icon-business-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-negocio',
				amount: ''
			},
			{
				name: 'Otro',
				image: 'assets/btn-icon-other.png',
				imageHover: 'assets/btn-icon-other-white.png',
				title: '',
				selected: false,
				gtm: 'vkt-otro',
				amount: ''
			}
		]
	},
	computed: {
		getAmount() {
			return accounting.formatMoney(this.amount, "$", 0, ",", ".");
		},
		getTime() {
			if (this.time > 1) {
				return this.time + ' años';
			} else {
				return this.time + ' año';
			}
		},
		getDayly() {
			var value = this.amount / (this.time * 365);
			return accounting.formatMoney(value, "$", 2, ",", ".");
		},
		getMonthly() {
			var value = this.amount / (this.time * 12);
			return accounting.formatMoney(value, "$", 2, ",", ".");
		},
		getYearly() {
			var value = this.amount / this.time;
			return accounting.formatMoney(value, "$", 2, ",", ".");
		}
	},
	methods: {
		nextStep() {

			if (this.isItemSelected) {

				this.showStep2 = true;
				this.mainSlideClass = 'wrapper__calc__mask__container_step2';
				this.showErrorMsg = false;

			} else {

				this.txtErrorMsg = 'Selecciona un sueño a cumplir';
				this.showErrorMsg = true;

			}

		},
		clickOrg(){
			dataLayer.push({
			'event': 'edufin-calculadoras',
			'CDAction': 'Clic botón',
			'CDLabel': 'Organizando mis gastos',
			'CDFunnel': 'Calculadora alcanzando mis sueños',
			'CDValue': 'step_3'
			});
		},
		clickAnt(){
			dataLayer.push({
			'event': 'edufin-calculadoras',
			'CDAction': 'Clic botón',
			'CDLabel': 'Gastos Hormiga',
			'CDFunnel': 'Calculadora alcanzando mis sueños',
			'CDValue': 'step_3'
			});
		},
		clickBlog(){
			dataLayer.push({
			'event': 'edufin-calculadoras',
			'CDAction': 'Clic botón',
			'CDLabel': 'ir al blog',
			'CDFunnel': 'Calculadora alcanzando mis sueños',
			'CDValue': 'step_3'
			});
		},
		resetCalc() {

			for (i=0; i<this.expenses.length; i++) {
				this.expenses[i].selected = false;
			}
			
			if(this.showStep3){
				dataLayer.push({
					'event': 'edufin-calculadoras',
					'CDAction': 'Clic botón',
					'CDLabel': 'reiniciar calculadora',
					'CDFunnel': 'Calculadora alcanzando mis sueños',
					'CDValue': 'step_3'
				});
			}
			else if(this.showStep2){
				dataLayer.push({
					'event': 'edufin-calculadoras',
					'CDAction': '02. Clic botón - Reiniciar',
					'CDLabel': this.dreamTxt,
					'CDFunnel': 'Calculadora alcanzando mis sueños',
					'CDValue': 'step_2'
				});
			}
			this.showResultBox = false;
			this.showStep2 = false;
			this.showStep3 = false;
			this.mainSlideClass = 'wrapper__calc__mask__container_step1';
			// this.amount = 40000;
			// this.time = 1;
			

			var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);

		},
		getBalance() {


			this.amount = document.getElementById('fieldAmount').value;
			this.time = document.getElementById('fieldTime').value;

			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '02. Clic botón - Finalizar',
				'CDLabel': this.dreamTxt,
				'CDFunnel': 'Calculadora alcanzando mis sueños',
				'CDValue': 'step_2',
				'spec_1': this.getAmount,
				'spec_2': this.getTime
			});


			this.showErrorMsg = false;
			this.result = 0;
			this.showStep3 = true;
			this.showResultBox = true;
			this.mainSlideClass = 'wrapper__calc__mask__container_step3';

			var etop = jQuery('.wrapper__calc__mask').offset().top;
			jQuery('html, body').animate({
			  scrollTop: etop
			}, 1000);
			dataLayer.push({
				'event': 'edufin-calculadoras',
				'CDAction': '03. Resultados',
				'CDLabel': this.dreamTxt,
				'CDFunnel': 'Calculadora alcanzando mis sueños',
				'CDValue': 'step_3',
				'spec_1': this.getAmount,
				'spec_2': this.getTime
			});
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
    	}
	}
});
