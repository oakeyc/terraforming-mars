
import Vue from 'vue';
// import {$t} from '../directives/i18n';
// import {Button} from '../components/common/Button';
// import {Message} from '../Message';
// import {CardOrderStorage} from './CardOrderStorage';
import {CardFinder} from '../CardFinder';
import {CardName} from '../CardName';
import {CorporationCard} from '../cards/corporation/CorporationCard';
import {PlayerModel} from '../models/PlayerModel';
// import {VueModelCheckbox, VueModelRadio} from './VueTypes';

// interface SelectCardModel {
//   cards: VueModelRadio<CardModel> | VueModelCheckbox<Array<CardModel>>;
//   warning: string | Message | undefined;
// }

// import {Card} from './card/Card';
// import {CardModel} from '../models/CardModel';
import {PlayerInputModel} from '../models/PlayerInputModel';

export const SelectInitialCards = Vue.component('select-initial-cards', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
    playerinput: {
      type: Object as () => PlayerInputModel,
    },
    onsave: {
      type: Function as unknown as () => (out: Array<Array<string>>) => void,
    },
    showsave: {
      type: Boolean,
    },
    showtitle: {
      type: Boolean,
    },
  },
  data: function() {
    return {
      selectedCards: [] as Array<CardName>,
      selectedCorporation: undefined as CorporationCard | undefined,
      selectedPrelude: [] as Array<CardName>,
    };
  },
  methods: {
    getRemainingMegaCredits: function() {
      if (this.selectedCorporation === undefined) {
        return NaN;
      }
      return this.selectedCorporation.startingMegaCredits - (this.selectedCards.length * 3);
    },
    saveData: function() {
      const result: Array<Array<string>> = [];
      result.push([]);
      if (this.selectedCorporation !== undefined) {
        result[0].push(this.selectedCorporation.name);
      }
      if (this.hasPrelude()) {
        result.push(this.selectedPrelude);
      }
      result.push(this.selectedCards);
      console.log(JSON.stringify(result));
    },
    hasPrelude: function() {
      return this.playerinput.options?.length === 3;
    },
    cardsChanged: function(cards: Array<CardName>) {
      this.selectedCards = cards;
    },
    corporationChanged: function(cards: Array<CardName>) {
      this.selectedCorporation = new CardFinder().getCorporationCardByName(cards[0]);
    },
    preludesChanged: function(cards: Array<CardName>) {
      this.selectedPrelude = cards;
    },
  },
  template: `<div>
    <div v-if="selectedCorporation">starting mega credits: {{getRemainingMegaCredits()}}</div>
    <select-card :player="player" :playerinput="playerinput.options[0]" :showtitle="true" v-on:cardschanged="corporationChanged" />
    <select-card v-if="hasPrelude()" :player="player" :playerinput="playerinput.options[1]" :showtitle="true" v-on:cardschanged="preludesChanged" />
    <select-card :player="player" :playerinput="playerinput.options[playerinput.options.length - 1]" :showtitle="true" v-on:cardschanged="cardsChanged" />
    <Button v-if="showsave" :onClick="saveData" type="submit" :title="playerinput.buttonLabel" />
  </div>`,
});

