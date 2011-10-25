<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="Infertek.Dynamix.Web._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
	<script type="text/javascript" src="/Scripts/Infertek/Common/Exceptions.js"></script>
	<script type="text/javascript" src="/Scripts/Infertek/Animations/PropertyValueAnimators.js"></script>
	<script type="text/javascript" src="/Scripts/Infertek/Animations/FrameBlendingFunctions.js"></script>
	<script type="text/javascript" src="/Scripts/Infertek/Animations/AnimationKeyframe.js"></script>
	<script type="text/javascript" src="/Scripts/Infertek/Animations/AnimationProperty.js"></script>
	<script type="text/javascript" src="/Scripts/Infertek/Animations/Animation.js"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			var animationSettings = {
				animationDirection: 1,
				timeScale: 1,
				properties: [{
					elementSelector: ".panel_header",
					propertyName: "width",
					keyframes: [{
						duration: 400,
						offset: 200,
						targetValue: "0px"
					}]
				}, {
					elementSelector: ".panel_content",
					propertyName: "height",
					keyframes: [{
						duration: 400,
						targetValue: "0px"
					}]
				}]
			};
			var animation = new window.Infertek.Animations.Animation(jQuery("#animated_panel"), animationSettings);
			var isPanelShown = true;
			var hasAnimationStarted = false;
			$("#toggle_show_button").click(function () {
				isPanelShown = !isPanelShown;
				animation.stop();
				if (isPanelShown) {
					animation.reverse();
					$("#toggle_show_button").val("Ukryj panel");
				} else {
					if (hasAnimationStarted) {
						animation.reverse();
					} else {
						hasAnimationStarted = true;
					}
					$("#toggle_show_button").val("Pokaż panel");
				}
				animation.start();
			});
		});

	</script>
	<style type="text/css">
		.panel_header
		{
			display: block;
			height: 30px;
			overflow: hidden;
			width: 300px;
		}
		.panel_content
		{
			overflow: hidden;
			width: 600px;
		}
	</style>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div id="animated_panel">
		<h2 class="panel_header">Panel header</h2>
		<div class="panel_content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, nisl at egestas cursus, nulla elit adipiscing nisl, ut facilisis arcu lectus id diam. Quisque rutrum nisi sit amet risus facilisis convallis. In lacinia, nisl at pretium facilisis, odio purus venenatis metus, id tristique tellus velit ac dui. Nullam sagittis semper sapien, aliquet tempus erat posuere vitae. Ut sem tortor, ultrices at consequat in, ultricies at nisi. Nunc metus justo, dignissim vitae porta ac, iaculis id turpis. Donec cursus quam felis, vitae viverra risus. Cras vitae sagittis dolor. Integer urna sapien, tempus a lacinia eu, pretium non urna. Vestibulum facilisis diam at nibh convallis rutrum. Duis sed elit nibh, id commodo ligula. Mauris dictum mollis nisi vel congue. Aliquam in eros luctus odio gravida ornare. Proin sit amet nisi eget nulla ullamcorper porta nec quis massa. Nullam ut neque sed neque tincidunt vehicula eu et nisi.
		</div>
	</div>
	<input type="button" id="toggle_show_button" value="Ukryj panel" />
</asp:Content>
