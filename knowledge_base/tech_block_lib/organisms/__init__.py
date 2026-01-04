from knowledge_base.tech_block_lib.organisms.carousel import component_mapping_carousel_agent, component_mapping_carousel_query
from knowledge_base.tech_block_lib.organisms.chart import component_mapping_chart_agent, component_mapping_chart_query
from knowledge_base.tech_block_lib.organisms.dynamic_form import component_mapping_dynamic_form_agent, component_mapping_dynamic_form_query
from knowledge_base.tech_block_lib.organisms.file_upload_field import component_mapping_file_upload_field_agent, component_mapping_file_upload_field_query
from knowledge_base.tech_block_lib.organisms.map import component_mapping_map_agent, component_mapping_map_query
from knowledge_base.tech_block_lib.organisms.table import component_mapping_table_agent, component_mapping_table_query

# agent: { description, prefixes }
component_mapping_organisms_agent = {
    **component_mapping_carousel_agent,
    **component_mapping_chart_agent,
    **component_mapping_dynamic_form_agent,
    **component_mapping_file_upload_field_agent,
    **component_mapping_map_agent,
    **component_mapping_table_agent
}

# Diccionario de componentes en inglés y español
# query: agent
component_mapping_organisms_query = {
    **component_mapping_carousel_query,
    **component_mapping_chart_query,
    **component_mapping_dynamic_form_query,
    **component_mapping_file_upload_field_query,
    **component_mapping_map_query,
    **component_mapping_table_query
}