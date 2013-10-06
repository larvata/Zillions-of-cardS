queries = {}
$.each document.location.search.substr(1).split("&"), (c, q) ->
	return if q.length is 0
	i = q.split("=")
	queries[i[0].toString()] = i[1].toString() 
  	

renderStaticLanguageText = () ->

	window.language_id = queries.lng if queries.lng?

	$('.navbar-brand').text(language_packs[language_id].text_nav_title)
	$('.nav-menu-about').text(language_packs[language_id].text_nav_about)
	$('.nav-menu-tools').text(language_packs[language_id].text_nav_tools)
	$('.nav-menu-loaddb').text(language_packs[language_id].text_nav_tools_loaddb)
	$('.nav-menu-savedb').text(language_packs[language_id].text_nav_tools_savedb)
	$('.nav-menu-site').text(language_packs[language_id].text_nav_tools_site)
	$('.nav-menu-language').text(language_packs[language_id].text_nav_languages)

	$('.about-version').text(language_packs[language_id].text_nav_about_version)
	$('.about-count').text(language_packs[language_id].text_nav_about_count)
	$('.about-designer').text(language_packs[language_id].text_nav_about_designer)
	$('.about-site').text(language_packs[language_id].text_nav_about_projectsite)

	for k, v of language_packs
		$(".nav-menu-language").next().append("<li><a href='"+location.pathname+"?lng=#{k}' data-language-id='#{k}'>#{v.language_name}</a></li>")
	



language_packs = []

language_pack_english =
	"language_name": "English"

	"text_nav_title": "Zillions of cardS"

	"text_nav_about": "About"
	"text_nav_about_version": "Version:"
	"text_nav_about_count": "Cards in database:"
	"text_nav_about_designer": "Powered by:"
	"text_nav_about_projectsite": "Project Site:"

	"text_nav_tools": "Tools"
	"text_nav_tools_loaddb": "Load DB..."
	"text_nav_tools_savedb": "Save DB As..."
	"text_nav_tools_site": "Z/X DB Site"

	"text_nav_languages": "Languages"

	"text_filter_keyword": "Keyword"
	"text_filter_reset": "Reset"
	"text_filter_all": "All"
	"text_filter_cost": "Cost"
	"text_filter_power": "Power"
	"text_filter_icon": "Icon"
	"text_filter_race": "Race"
	"text_filter_cardset": "Card Set"
	"text_filter_rarity": "Rarity"

	"text_summary_details": "Details"
	"text_details_cost": "Cost"
	"text_details_power": "Power"
	"text_details_icon": "Icon"
	"text_details_description": "Desc."
	"text_details_neta": "Nta."
	"text_details_ruling": "Ruling"

language_packs_chinese_s =
	"language_name": "中文"
	"text_nav_title": "Zillions of cardS"

	"text_nav_about": "关于"
	"text_nav_about_version": "版本号:"
	"text_nav_about_count": "卡牌收录数:"
	"text_nav_about_designer": "代码:"
	"text_nav_about_projectsite": "项目站点:"

	"text_nav_tools": "工具"
	"text_nav_tools_loaddb": "载入数据库..."
	"text_nav_tools_savedb": "数据库另存为..."
	"text_nav_tools_site": "官方页面"

	"text_nav_languages": "语言"

	"text_filter_keyword": "关键字"
	"text_filter_reset": "重 置"
	"text_filter_all": "全部"
	"text_filter_cost": "费用"
	"text_filter_power": "力量"
	"text_filter_icon": "标记"
	"text_filter_race": "种族"
	"text_filter_cardset": "卡包"
	"text_filter_rarity": "罕贵度"

	"text_summary_details": "详细情报"
	"text_details_cost": "费用"
	"text_details_power": "力量"
	"text_details_icon": "标记"
	"text_details_description": "简介"
	"text_details_neta": "Neta"
	"text_details_ruling": "裁定"

language_packs.push language_pack_english
language_packs.push language_packs_chinese_s

# render static text
$ ->
	renderStaticLanguageText()


