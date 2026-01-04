# atoms
from knowledge_base.tech_block_lib.atoms.button import component_mapping_button_agent, component_mapping_button_query
from knowledge_base.tech_block_lib.atoms.input_text import component_mapping_input_text_agent, component_mapping_input_text_query
from knowledge_base.tech_block_lib.atoms.input_number import component_mapping_input_number_agent, component_mapping_input_number_query
from knowledge_base.tech_block_lib.atoms.dropdown import component_mapping_dropdown_agent, component_mapping_dropdown_query
from knowledge_base.tech_block_lib.atoms.dropdown_multi_select import component_mapping_dropdown_multi_select_agent, component_mapping_dropdown_multi_select_query
from knowledge_base.tech_block_lib.atoms.input_text_area import component_mapping_input_text_area_agent, component_mapping_input_text_area_query
from knowledge_base.tech_block_lib.atoms.checkbox import component_mapping_checkbox_agent, component_mapping_checkbox_query
from knowledge_base.tech_block_lib.atoms.radio_button import component_mapping_radio_button_agent, component_mapping_radio_button_query
from knowledge_base.tech_block_lib.atoms.switch import component_mapping_switch_agent, component_mapping_switch_query
from knowledge_base.tech_block_lib.atoms.slider import component_mapping_slider_agent, component_mapping_slider_query
from knowledge_base.tech_block_lib.atoms.alert import component_mapping_alert_agent, component_mapping_alert_query
from knowledge_base.tech_block_lib.atoms.avatar import component_mapping_avatar_agent, component_mapping_avatar_query
from knowledge_base.tech_block_lib.atoms.badge import component_mapping_badge_agent, component_mapping_badge_query
from knowledge_base.tech_block_lib.atoms.breadcrumb import component_mapping_breadcrumb_agent, component_mapping_breadcrumb_query
from knowledge_base.tech_block_lib.atoms.chip import component_mapping_chip_agent, component_mapping_chip_query
from knowledge_base.tech_block_lib.atoms.empty_message import component_mapping_empty_message_agent, component_mapping_empty_message_query
from knowledge_base.tech_block_lib.atoms.indicator_gallery import component_mapping_indicator_gallery_agent, component_mapping_indicator_gallery_query
from knowledge_base.tech_block_lib.atoms.list import component_mapping_list_agent, component_mapping_list_query
from knowledge_base.tech_block_lib.atoms.listbox import component_mapping_listbox_agent, component_mapping_listbox_query
from knowledge_base.tech_block_lib.atoms.progress_bar import component_mapping_progress_bar_agent, component_mapping_progress_bar_query
from knowledge_base.tech_block_lib.atoms.progress_spinner import component_mapping_progress_spinner_agent, component_mapping_progress_spinner_query
from knowledge_base.tech_block_lib.atoms.scroller import component_mapping_scroller_agent, component_mapping_scroller_query
from knowledge_base.tech_block_lib.atoms.search import component_mapping_search_agent, component_mapping_search_query
from knowledge_base.tech_block_lib.atoms.skeleton import component_mapping_skeleton_agent, component_mapping_skeleton_query
from knowledge_base.tech_block_lib.atoms.snackbar import component_mapping_snackbar_agent, component_mapping_snackbar_query
from knowledge_base.tech_block_lib.atoms.tag import component_mapping_tag_agent, component_mapping_tag_query
from knowledge_base.tech_block_lib.atoms.tooltip import component_mapping_tooltip_agent, component_mapping_tooltip_query

# agent: { description, prefixes }
component_mapping_atoms_agent = {
    # atoms
    **component_mapping_alert_agent,
    **component_mapping_avatar_agent,
    **component_mapping_badge_agent,
    **component_mapping_breadcrumb_agent,
    **component_mapping_button_agent,
    **component_mapping_checkbox_agent,
    **component_mapping_chip_agent,
    **component_mapping_dropdown_multi_select_agent,
    **component_mapping_dropdown_agent,
    **component_mapping_empty_message_agent,
    **component_mapping_indicator_gallery_agent,
    **component_mapping_input_number_agent,
    **component_mapping_input_text_area_agent,
    **component_mapping_input_text_agent,
    **component_mapping_list_agent,
    **component_mapping_listbox_agent,
    **component_mapping_progress_bar_agent, 
    **component_mapping_progress_spinner_agent,
    **component_mapping_radio_button_agent,
    **component_mapping_scroller_agent,
    **component_mapping_search_agent,
    **component_mapping_skeleton_agent,
    **component_mapping_slider_agent,
    **component_mapping_snackbar_agent,
    **component_mapping_switch_agent,
    **component_mapping_tag_agent,
    **component_mapping_tooltip_agent
}

# Diccionario de componentes en inglés y español
# query: agent
component_mapping_atoms_query = {
    # atoms
    **component_mapping_alert_query,
    **component_mapping_avatar_query,
    **component_mapping_badge_query,
    **component_mapping_breadcrumb_query,
    **component_mapping_button_query,
    **component_mapping_checkbox_query,
    **component_mapping_chip_query,
    **component_mapping_dropdown_multi_select_query,
    **component_mapping_dropdown_query,
    **component_mapping_empty_message_query,
    **component_mapping_indicator_gallery_query,
    **component_mapping_input_number_query,
    **component_mapping_input_text_area_query,
    **component_mapping_input_text_query,
    **component_mapping_list_query,
    **component_mapping_listbox_query,
    **component_mapping_progress_bar_query,
    **component_mapping_progress_spinner_query,
    **component_mapping_radio_button_query,
    **component_mapping_scroller_query,
    **component_mapping_search_query,
    **component_mapping_skeleton_query,
    **component_mapping_slider_query,
    **component_mapping_snackbar_query,
    **component_mapping_switch_query,
    **component_mapping_tag_query,
    **component_mapping_tooltip_query
}