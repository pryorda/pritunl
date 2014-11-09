define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/userServersListItem.html'
], function($, _, Backbone, userServersListItemTemplate) {
  'use strict';
  var UserServersListItemView = Backbone.View.extend({
    className: 'user-server',
    template: _.template(userServersListItemTemplate),
    render: function() {
      this.$el.html(this.template());
      this.update();
      this.$('.server-item').tooltip();
      return this;
    },
    update: function() {
      var name = this.model.get('name');
      var device_name = this.model.get('device_name');

      if (name && device_name) {
        name = name + ' (' + device_name + ')'
      }

      this.$('.server-name .title').text(name);

      var addr = this.model.get('virt_address');
      if (addr) {
        this.$('.server-addr .title').text(addr);
        this.$('.server-addr').show();
      }
      else {
        this.$('.server-addr').hide();
      }

      var addrReal = this.model.get('real_address');
      if (addrReal) {
        this.$('.server-real-addr .title').text(addrReal.split(':')[0]);
        this.$('.server-real-addr').show();
      }
      else {
        this.$('.server-real-addr').hide();
      }

      if (this.model.get('bytes_sent')) {
        this.$('.server-sent .title').text(
          window.formatSize(this.model.get('bytes_sent')));
        this.$('.server-sent').show();
      }
      else {
        this.$('.server-sent').hide();
      }

      if (this.model.get('bytes_received')) {
        this.$('.server-recv .title').text(
          window.formatSize(this.model.get('bytes_received')));
        this.$('.server-recv').show();
      }
      else {
        this.$('.server-recv').hide();
      }

      if (this.model.get('connected_since')) {
        this.$('.server-time .title').text(
          window.formatTime(this.model.get('connected_since'), 'short'));
        this.$('.server-time').show();
      }
      else {
        this.$('.server-time').hide();
      }

      if (this.model.get('status')) {
        if (!this.$('.status-icon').hasClass('online')) {
          this.$('.status-icon').removeClass('offline');
          this.$('.status-icon').addClass('online');
          this.$('.status-text').text('Online');
        }
      }
      else {
        if (!this.$('.status-icon').hasClass('offline')) {
          this.$('.status-icon').removeClass('online');
          this.$('.status-icon').addClass('offline');
          this.$('.status-text').text('Offline');
        }
      }
    }
  });

  return UserServersListItemView;
});
