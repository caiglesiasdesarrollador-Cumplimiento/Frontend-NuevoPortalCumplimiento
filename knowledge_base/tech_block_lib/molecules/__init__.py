from knowledge_base.tech_block_lib.molecules.accordion import component_mapping_accordion_agent, component_mapping_accordion_query
from knowledge_base.tech_block_lib.molecules.answer_state import component_mapping_answer_state_agent, component_mapping_answer_state_query
from knowledge_base.tech_block_lib.molecules.banner import component_mapping_banner_agent, component_mapping_banner_query
from knowledge_base.tech_block_lib.molecules.calendar import component_mapping_calendar_agent, component_mapping_calendar_query
from knowledge_base.tech_block_lib.molecules.card import component_mapping_card_agent, component_mapping_card_query
from knowledge_base.tech_block_lib.molecules.context_menu import component_mapping_context_menu_agent, component_mapping_context_menu_query
from knowledge_base.tech_block_lib.molecules.empty_state import component_mapping_empty_state_agent, component_mapping_empty_state_query
from knowledge_base.tech_block_lib.molecules.image import component_mapping_image_agent, component_mapping_image_query
from knowledge_base.tech_block_lib.molecules.modal import component_mapping_modal_agent, component_mapping_modal_query
from knowledge_base.tech_block_lib.molecules.modal_notification import component_mapping_modal_notification_agent, component_mapping_modal_notification_query
from knowledge_base.tech_block_lib.molecules.onboarding import component_mapping_onboarding_agent, component_mapping_onboarding_query
from knowledge_base.tech_block_lib.molecules.paginator import component_mapping_paginator_agent, component_mapping_paginator_query 
from knowledge_base.tech_block_lib.molecules.password_meter import component_mapping_password_meter_agent, component_mapping_password_meter_query
from knowledge_base.tech_block_lib.molecules.stepper_vertical import component_mapping_stepper_vertical_agent, component_mapping_stepper_vertical_query
from knowledge_base.tech_block_lib.molecules.stepper import component_mapping_stepper_agent, component_mapping_stepper_query
from knowledge_base.tech_block_lib.molecules.tabs import component_mapping_tabs_agent, component_mapping_tabs_query
from knowledge_base.tech_block_lib.molecules.uploading_file import component_mapping_uploading_file_agent, component_mapping_uploading_file_query

# agent: { description, prefixes }
component_mapping_molecules_agent = {
    **component_mapping_accordion_agent,
    **component_mapping_answer_state_agent,
    **component_mapping_banner_agent,
    **component_mapping_calendar_agent,
    **component_mapping_card_agent,
    **component_mapping_context_menu_agent,
    **component_mapping_empty_state_agent,
    **component_mapping_image_agent,
    **component_mapping_modal_agent,
    **component_mapping_modal_notification_agent,
    **component_mapping_onboarding_agent,
    **component_mapping_paginator_agent,
    **component_mapping_password_meter_agent,
    **component_mapping_stepper_vertical_agent,
    **component_mapping_stepper_agent,
    **component_mapping_tabs_agent,
    **component_mapping_uploading_file_agent
}

# Diccionario de componentes en inglés y español
# query: agent
component_mapping_molecules_query = {
    **component_mapping_accordion_query,
    **component_mapping_answer_state_query,
    **component_mapping_banner_query,
    **component_mapping_calendar_query,
    **component_mapping_card_query,
    **component_mapping_context_menu_query,
    **component_mapping_empty_state_query,
    **component_mapping_image_query,
    **component_mapping_modal_query,
    **component_mapping_modal_notification_query,
    **component_mapping_onboarding_query,
    **component_mapping_paginator_query,
    **component_mapping_password_meter_query,
    **component_mapping_stepper_vertical_query,
    **component_mapping_stepper_query,
    **component_mapping_tabs_query,
    **component_mapping_uploading_file_query
}