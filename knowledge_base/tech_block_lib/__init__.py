# atoms
from knowledge_base.tech_block_lib.atoms import component_mapping_atoms_agent, component_mapping_atoms_query
# molecules
from knowledge_base.tech_block_lib.molecules import component_mapping_molecules_agent, component_mapping_molecules_query
# organisms
from knowledge_base.tech_block_lib.organisms import component_mapping_organisms_agent, component_mapping_organisms_query

# agent: { description, prefixes }
component_mapping_tech_block_lib_agent = {
    # atoms
    **component_mapping_atoms_agent,
    # molecules
    **component_mapping_molecules_agent,
    # organisms
    **component_mapping_organisms_agent
}

# Diccionario de componentes en inglés y español
# query: agent
component_mapping_tech_block_lib_query = {
    # atoms
    **component_mapping_atoms_query,
    # molecules
    **component_mapping_molecules_query,
    # organisms
    **component_mapping_organisms_query
}