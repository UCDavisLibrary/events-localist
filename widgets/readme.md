# Custom Widgets

[Localist provides a GUI](http://ucdavis.enterprise.localist.com/help/widget), which anyone can use to generate html and embed a list of our events in any website.

Administrators can build templates (written in a [basic flavor of Liquid](https://shopify.github.io/liquid/basics/introduction/)) to control how events are displayed by going to `Content -> Widgets`. However, for this implementation, custom elements do most of the heavy lifting.

A template will:
1. declare these custom elements
2. pass event data to the custom elements via `template` tags. FYI, the version of Liquid Localist uses does not have the JSON filter (among other issues), so using a script tag will not work.
3. Set the script tag to download the js with the custom elements (if not already included in your site's bundle)

The template will look something like this:
```html
<script type="text/javascript">
  const scriptTag = document.createElement('script');
  scriptTag.src = 'https://files.library.ucdavis.edu/localist/widgets/js/latest/ucdlib-events-widgets.js';
  if ( document.body ) {
    document.body.appendChild(scriptTag);
  } else if (document.head) {
    document.body.appendChild(scriptTag);
  }
</script>
<ucdlib-localist-events>
  {% if settings.show_view_all_cta %}
    <template ele-prop='relativeCalendarUrl'>{% relative_calendar_url %}</template>
  {% endif %} 
  {% for event in events %}
    {% capture tags %}{% for tag in event.tags %}{{tag.name}}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
    {% capture event_types %}{% for et in event.event_types %}{{et}}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
    <ucdlib-localist-event>
      <template ele-prop='event.name'>{{event.name}}</template>
      <template ele-prop='event.url'>{{event.url}}</template>
      <template ele-prop='event.description_text'>{{event.description_text}}</template>
      {% if event.place != empty and event.place %}
        <template ele-prop='event.place.visible_name'>{{event.place.visible_name}}</template>
        <template ele-prop='event.place.url'>{{event.place.url}}</template>
      {% endif %}
      <template ele-prop='event.img_html'>{% photo_for event size:square_300 width:200 height:200 %}</template>
      <template ele-prop='event.room_number'>{{event.room_number}}</template>
      <template ele-prop='event.experience'>{{event.experience}}</template>
      <template ele-prop='event.starts_at'>{{event.starts_at}}</template>
      <template ele-prop='event.ends_at'>{{event.ends_at}}</template>
      <template ele-prop='event.first_date'>{{event.first_date}}</template>
      <template ele-prop='event.last_date'>{{event.last_date}}</template>
      <template ele-prop='event.has_instances' ele-prop-type='boolean'>{{event.has_instances}}</template>
      <template ele-prop='event.has_many_future_instances' ele-prop-type='boolean'>{{event.has_many_future_instances}}</template>
      <template ele-prop='event.location_name'>{{event.location_name}}</template>
      <template ele-prop='event.event_types' ele-prop-type='array'>{{event_types}}</template>
      <template ele-prop='event.tags' ele-prop-type='array'>{{tags}}</template>
      <template ele-prop='event.event_type'>{{event.event_type}}</template>
      <template ele-prop='event.needs_registration'>{{event.needs_registration}}</template>
      <template ele-prop='event.has_tickets'>{{event.has_tickets}}</template>
      <template ele-prop='event.allows_attendance'>{{event.allows_attendance}}</template>
      <template ele-prop='event.has_external_tickets'>{{event.has_external_tickets}}</template>
      <template ele-prop='event.website'>{{event.website}}</template>
      <template ele-prop='event.ical_url'>{{event.ical_url}}</template>
      <template ele-prop='event.status'>{{event.status}}</template>
    </ucdlib-localist-event>
  {% endfor %}
</ucdlib-localist-events>
```

There is no exhaustive documentation for the event class and custom liquid functions. I pieced it all together by:
1. Using the [theme editor documentation](https://help.concept3d.com/hc/en-us/articles/11944706675987-Theme-Editor).
2. Using the [API documentation](https://developer.localist.com/doc/api) (some property names are the same).
3. Looking at the OOB templates.

## Local Development

```bash
npm i
npm run watch
http-server -p 3000
```

## Deployment
Run `npm run dist` to generate the production bundle, and then upload it to `files.library.ucdavis.edu/localist/widgets/js/latest`
