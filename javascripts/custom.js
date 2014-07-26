$(document).ready(function(){
    $('.entry-content p a').each(function(e){
        var $this = $(this);
        // escape footnotes
        var hasAttr = $this.attr('rel') || $this.attr('rev');
        if (hasAttr !== "footnote") {
            $this.attr('target', '_blank');
        }
    });
});
