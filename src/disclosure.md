# AI Usage Disclosure

Claude Code (an AI) assisted me in making this project. The items I used Claude for are listed here.

## Main Section Spanning

```css
main {
    background-color: var(--offwhite);
    flex: 1; /* make the main content take up all available space between the header and footer */
}
```

I had an issue where I wanted the offwhite color to fill in the entire area
between the header and footer which are their own colors. To do this,
I used Claude to fix this and the solution was adding `flex: 1` to the main section
in css.

## Main() Function Pattern

In my js file, I made the function call pattern similar to what is done in python.
I got this idea when I asked Claude about what is the "modern js" practices for
setting up your scripts, and in the end I settled on making a main function
that orchestrates the calls to all other functions and then call main() in the
global space at the very bottom, similar to how python uses `if __name__ == '__main__'`.

I'm still not sure what the convention is for structuring your code in js is, but
this solution works for me and I think is simple and effective.

## CSS Units

I asked Claude to review my css and learned that using pixel units for horizontal padding
will look bad on smaller screens. This issue also concerns me since I constantly swap
between screen sizes and often split my screen to make my browser take half my screen.

I learned that for horizontal padding, you shouldn't use pixel values but instead
use rem or percentages. That is lines in my css randomly flips between many different
units. As I was making the css, I tried to keep all horizontal padding as rem or %s
and use pixel units for vertical spacing.

The unit swap from pixels to rem/% was also used for font sizes.

## CSS Variable Declaration

From the past I knew you could make css variables, I just forgot how.
I asked AI and learned to do it with `var(--variable-name)` in a `:root {}` block
in the sheet.

To my knowledge, the root block is where you define your variables
and the `* {}` block is where you apply global styles to all elements.

## HR separator Instead of Div

The one \<hr> tag I have was recommended by Claude instead of using
a \<div> to make a simple separator bar. The tag is a horizontal break
that I styled to fit the page. I initially just used a div with an id
that I styled in css.

## Building the Agents Section in HTML

For the agents section, I wasn't sure how to have both the agent's portrait and
background show in the same place, so AI helped me by recommending to wrap it
in a div, which I agreed with since it's just a visual styling thing, then
set the div's background to what I want, and set the image like normal.

I also wrapped the agent's description in a div to do something similar
to apply styles to the 3 nested tags and update their hidden state.

## CSS Debugging

CSS debugging was by far the biggest portion I used AI on. I wanted to apply a lot of styles
but wasn't sure how to do a lot of it, so I asked AI. Now I didn't just copy and paste
and the response, since I do want to learn, so I went through line by line, and deleted it
then rewrote it to see the before and after. If there was a line the AI gave me but I couldn't see
the difference it made, I removed it.

For any complicated css stuff, I wrote comments to explain what every line does. The JS and HTML
code I personally don't think is very complicated and I naturally write a ton of comments in
my code, but the CSS is kinda complex in some sections.

## JS Help

For some sections of the JS, I kinda knew what I wanted to do but wasn't sure of how to do it
in JS. For example, I didn't know JS had a .find() method I could use when trying to get
the current selected agent. I also didn't know how to create the ability cards, when I learned
that you can use .append() instead of .appendChild() since with .append() you can add
multiple nodes which I needed since I was trying to append an image, a paragraph, and a header
to a single \<li>.

I also needed help on setting up the event handler which AI helped me with. Select boxes use
"change" as the thing to listen for and I needed to pass something other than an event
to my callback function, where I learned to just use an arrow function and pass the event
and parameter to the callback instead since I remember having trouble trying
to pass the arg without arrow function syntax.

## HTML Hidden Property

This one was a huge gamechanger. I'm not sure if we learned this in the past, but marking something hidden
in HTML then activating it or deactivating it in JS was really cool for my project. This is done to dynamically
update the page after the API response is loaded, or to show the error screen when the response fails.
