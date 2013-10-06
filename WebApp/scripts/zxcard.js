// Generated by CoffeeScript 1.6.3
$(function() {
  var AppView, CardDetailsView, CardList, CardListView, CardModel, CardSummaryView, FilterModel, FilterPanelView, app, cardDetailsView, cardListCollection, cardSummaryView, panel;
  _.each(dbMain, function(value, key) {
    var list;
    if (value.Version.length > 0) {
      value.Disabled = true;
    }
    list = _.filter(dbMain, function(obj) {
      return obj.CardName_Ch === value.CardName_Ch;
    });
    _.extend(value, {
      Relations: list
    });
    return _.extend(value, {
      Id: key
    });
  });
  $('.about-card-count').text(dbMain.length);
  FilterModel = Backbone.Model.extend({
    defaults: {
      Keyword: '',
      Type: '',
      Colors: '',
      Cost: '',
      Cost_Method: '',
      Power: '',
      Power_Method: '',
      Icon: '',
      Race: '',
      CardSet: '',
      Rarity: '',
      Tags: ''
    }
  });
  CardSummaryView = Backbone.View.extend({
    el: '.main-card-summary',
    template: _.template($('#cardSummaryTemplate').html()),
    initialize: function() {
      return this.render();
    },
    render: function() {
      if (this.model != null) {
        return this.$el.html(this.template({
          Card: this.model.toJSON()
        }));
      }
    },
    events: {
      "change .card-summary-versions": "cardVersionChange",
      "reset": "resetModel"
    },
    cardVersionChange: function(event) {
      var cardDetailsView, cardSummaryView, id, model;
      if (this.collection != null) {
        id = $(event.currentTarget).find('option:selected').data('id');
        model = this.collection.byId(id);
        cardSummaryView = new CardSummaryView({
          model: model
        });
        return cardDetailsView = new CardDetailsView({
          model: model
        });
      }
    }
  });
  CardDetailsView = Backbone.View.extend({
    el: '.main-card-detail',
    template: _.template($('#cardDetailsTemplate').html()),
    initialize: function() {
      return this.render();
    },
    render: function() {
      var classSuffix;
      if (this.model != null) {
        this.$el.html(this.template({
          Card: this.model.toJSON()
        }));
        this.$el.attr("class", "main-card-detail col-lg-4 col-md-3");
        classSuffix = "";
        switch (this.model.toJSON().CardColor_Ch) {
          case "蓝":
            classSuffix = "blue";
            break;
          case "白":
            classSuffix = "white";
            break;
          case "黑":
            classSuffix = "black";
            break;
          case "绿":
            classSuffix = "green";
            break;
          case "红":
            classSuffix = "red";
            break;
          case "无":
            classSuffix = "mu";
            break;
          case "龙":
            classSuffix = "dragon";
        }
        return this.$el.addClass("card-color-" + classSuffix);
      }
    },
    events: {
      "click li": "navtabsChange"
    },
    navtabsChange: function(event) {
      var tab;
      if (event != null) {
        tab = $(event.currentTarget).data("tab");
      } else {
        tab = 'desc';
      }
      $('.zx-tab-pages div').hide();
      $(".zx-tab-pages div[data-tab=" + tab + "]").show();
      $('.zx-card-tabs li').removeClass('active');
      return $(".zx-card-tabs li[data-tab=" + tab + "]").addClass('active');
    }
  });
  CardListView = Backbone.View.extend({
    el: '.main-filter-result',
    template: _.template($('#cardListTemplate').html()),
    initialize: function() {
      this.collection = cardListCollection;
      return this.render();
    },
    render: function() {
      this.$el.html(this.template({
        CardList: this.collection.toJSON()
      }));
      $('.main-filter-result a').click(function() {
        $('.main-filter-result a').removeClass('actived');
        return $(this).addClass('actived');
      });
      if (this.collection.length > 0) {
        return this.renderCardDetails();
      }
    },
    events: {
      "click a": "renderCardDetails"
    },
    renderCardDetails: function(event) {
      var cardDetailsView, cardSummaryView, ele, id, model;
      if (event != null) {
        ele = $(event.toElement).closest('a');
        id = ele.data("id");
        model = this.collection.models[id];
      } else {
        model = _.find(this.collection.models, function(model) {
          return model.get('Filtered') === false && model.get('Disabled') === false;
        });
      }
      cardSummaryView = new CardSummaryView({
        model: model
      });
      return cardDetailsView = new CardDetailsView({
        model: model
      });
    }
  });
  FilterPanelView = Backbone.View.extend({
    el: '.zx-panel-filter',
    template: _.template($('#filterPanelTemplate').html()),
    initialize: function() {
      this.model = new FilterModel();
      this.collection = cardListCollection;
      this.model.set('Type', _.chain(this.collection.pluck("Type")).uniq().compact().without("-").value());
      this.model.set('Colors', _.chain(this.collection.pluck("CardColor_Ch")).uniq().compact().without("-").value());
      this.model.set('Cost', _.chain(this.collection.pluck("Cost")).uniq().compact().without("-").sortBy(function(cost) {
        return parseInt(cost);
      }).value());
      this.model.set('Power', _.chain(this.collection.pluck("Power")).uniq().compact().without("-").sortBy(function(power) {
        return parseInt(power);
      }).value());
      this.model.set('Icon', _.chain(this.collection.pluck("Icon")).uniq().compact().without("-").value());
      this.model.set('Race', _.chain(this.collection.pluck("Race")).uniq().compact().without("-").value());
      this.model.set('CardSet', _.chain(this.collection.pluck("CardSet")).uniq().compact().without("-").value());
      this.model.set('Rarity', _.chain(this.collection.pluck("Rarity")).uniq().compact().without("-").sortBy(function(rarity) {
        switch (rarity.toLowerCase()) {
          case "cvr":
            return 1;
          case "igr":
            return 2;
          case "z/xr":
            return 3;
          case "sp":
            return 4;
          case "r":
            return 5;
          case "uc":
            return 6;
          case "c":
            return 7;
          case "f":
            return 8;
          case "pr":
            return 9;
          default:
            return 99;
        }
      }).value());
      this.model.set('Tag', _.chain(this.collection.pluck("Tag")).uniq().compact().without("-").value());
      return this.$el.html(this.template({
        filterData: this.model.toJSON()
      }));
    },
    events: {
      "click .btn-reset": "resetFilterConditions",
      "keyup .filter-keyword": "filterCards",
      "change .filter-keyword": "filterCards",
      "change .filter-types": "filterCards",
      "change .filter-colors": "filterCards",
      "change .filter-costs": "filterCards",
      "change .filter-cost-method": "filterCards",
      "change .filter-powers": "filterCards",
      "change .filter-power-method": "filterCards",
      "change .filter-icons": "filterCards",
      "change .filter-races": "filterCards",
      "change .filter-cardsets": "filterCards",
      "change .filter-rarities": "filterCards",
      "change .filter-tags": "filterCards"
    },
    resetFilterConditions: function() {
      $(".filter-keyword").val("");
      $(".filter-colors label").removeClass("active");
      $(".filter-colors input").prop("checked", false);
      $(".filter-types option:first-child").prop("selected", true);
      $(".filter-cost-method option:first-child").prop("selected", true);
      $(".filter-costs option:first-child").prop("selected", true);
      $(".filter-powers option:first-child").prop("selected", true);
      $(".filter-power-method option:first-child").prop("selected", true);
      $(".filter-icons option:first-child").prop("selected", true);
      $(".filter-races option:first-child").prop("selected", true);
      $(".filter-cardsets option:first-child").prop("selected", true);
      $(".filter-rarities option:first-child").prop("selected", true);
      $(".filter-tags label").removeClass("active");
      $(".filter-tags input").prop("checked", false);
      return this.filterCards();
    },
    getFilterCondition: function() {
      return {
        keyword: $(".filter-keyword").val(),
        type: $(".filter-types").val(),
        color: _.pluck($(".filter-colors input:checked"), "value"),
        icon: $(".filter-icons").val(),
        race: $(".filter-races").val(),
        cardset: $(".filter-cardsets").val(),
        rarity: $(".filter-rarities").val(),
        tags: _.pluck($(".filter-tags input:checked"), "value"),
        cost: $(".filter-costs").val(),
        cost_operation: $(".filter-cost-method").val(),
        power: $(".filter-powers").val(),
        power_operation: $(".filter-power-method").val()
      };
    },
    filterCards: function() {
      var conditions;
      conditions = this.getFilterCondition();
      _.each(this.collection.models, function(model) {
        model.set('Filtered', false);
        if (conditions.keyword.length !== 0) {
          if (((model.get('CardName_Ch') != null) && model.get('CardName_Ch').search(conditions.keyword) === -1) && ((model.get('CardName_Jp') != null) && model.get('CardName_Jp').search(conditions.keyword) === -1) && ((model.get('Nickname') != null) && model.get('Nickname').search(conditions.keyword) === -1) && ((model.get('SerialNo') != null) && model.get('SerialNo').toLowerCase().search(conditions.keyword.toLowerCase()) === -1)) {
            model.set('Filtered', true);
          }
        }
        if (conditions.type.length !== 0) {
          if (model.get('Type').search(conditions.type) === -1) {
            model.set('Filtered', true);
          }
        }
        if (conditions.color.length !== 0) {
          if (conditions.color === model.get('CardColor_Ch')) {
            model.set('Filtered', true);
          }
        }
        if (conditions.icon.length !== 0) {
          if (model.get('Icon').search(conditions.icon) === -1) {
            model.set('Filtered', true);
          }
        }
        if (conditions.race.length !== 0) {
          if (model.get('Race').search(conditions.race) === -1) {
            model.set('Filtered', true);
          }
        }
        if (conditions.cardset.length !== 0) {
          if (model.get('CardSet').search(conditions.cardset) === -1) {
            model.set('Filtered', true);
          }
        }
        if (conditions.rarity.length !== 0) {
          if (model.get('Rarity').search(conditions.rarity) === -1) {
            model.set('Filtered', true);
          }
        }
        if (conditions.tags.length !== 0) {
          if (!_.contains(conditions.tags, model.get('Tag'))) {
            model.set('Filtered', true);
          }
        }
        if (parseInt(conditions.cost) !== -1) {
          switch (conditions.cost_operation) {
            case ">":
              if (parseInt(model.get('Cost')) <= parseInt(conditions.cost)) {
                model.set('Filtered', true);
              }
              break;
            case "<":
              if (parseInt(model.get('Cost')) >= parseInt(conditions.cost)) {
                model.set('Filtered', true);
              }
              break;
            case "=":
              if (parseInt(model.get('Cost')) !== parseInt(conditions.cost)) {
                model.set('Filtered', true);
              }
          }
        }
        if (parseInt(conditions.power) !== -1) {
          switch (conditions.power_operation) {
            case ">":
              if (parseInt(model.get('Power')) <= parseInt(conditions.power)) {
                return model.set('Filtered', true);
              }
              break;
            case "<":
              if (parseInt(model.get('Power')) >= parseInt(conditions.power)) {
                return model.set('Filtered', true);
              }
              break;
            case "=":
              if (parseInt(model.get('Power')) !== parseInt(conditions.power)) {
                return model.set('Filtered', true);
              }
          }
        }
      });
      return new CardListView();
    }
  });
  AppView = Backbone.View.extend({
    initialize: function() {
      return new CardListView();
    },
    render: function() {},
    displayCardDetails: function() {},
    filter: function() {}
  });
  CardModel = Backbone.Model.extend({
    defaults: {
      CardSet: '',
      CardColor_Ch: '',
      CardColor_En: '',
      SerialNo: '',
      Version: '',
      Img_Suffix: '',
      CardName_Jp: '',
      CardName_Ch: '',
      Rarity: '',
      Type: '',
      Race: '',
      Cost: 0,
      Power: 0,
      Icon: '',
      Ability_Ch: '',
      Ability_Jp: '',
      Description_Ch: '',
      Description_Jp: '',
      Neta: '',
      Relation: '',
      Illustrator: '',
      Tag: '',
      Nickname: '',
      Ruling: '',
      TsugKomi: '',
      Filtered: false,
      Disabled: false,
      Selected: false
    }
  });
  CardList = Backbone.Collection.extend({
    model: CardModel,
    initialize: function() {
      return this.on("reset", function() {
        return alert("reseted");
      });
    },
    byId: function(id) {
      var filtered;
      filtered = this.filter(function(card) {
        return card.get("Id") === id;
      });
      return filtered[0];
    },
    events: {
      "change": "valueChanged"
    },
    valueChanged: function() {
      return alert("valueChanged");
    }
  });
  cardListCollection = new CardList(dbMain);
  cardSummaryView = new CardSummaryView(cardListCollection.models[0]);
  cardDetailsView = new CardDetailsView(cardListCollection.models[0]);
  panel = new FilterPanelView();
  return app = new AppView();
});
