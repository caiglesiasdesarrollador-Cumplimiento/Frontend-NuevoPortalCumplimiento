# agent: { description, prefixes }
component_mapping_card_agent = {
    "card-general": { # Nombre de Agente
        "description": "Consultas sobre componente card",
        "prefixes": ["card-interface", "card-definition", "card-usage"] # Nombre de archivos .md a consultar
    },
    "card-template": { # Nombre de Agente
        "description": "Consultas sobre componente card y sus templates",
        "prefixes": ["card-interface", "card-definition", "card-usage", "card-template"] # Nombre de archivos .md a consultar
    },
    "card-theme": { # Nombre de Agente
        "description": "Consultas sobre las variables css del componente card",
        "prefixes": ["card-interface", "card-definition", "card-usage", "card-theme"] # Nombre de archivos .md a consultar
    }
}

# Diccionario de componentes en inglés y español
# query: agent
component_mapping_card_query = {
    # card-general
    "ilibtbcard": "card-general",
    "libtbcardmodule": "card-general",
    "lib-tb-card": "card-general",
    "card": "card-general",
    # card-template
    "card con template": "card-template",
    "card y template": "card-template",
    "card + template": "card-template",
    "card más template": "card-template",
    "card mas template": "card-template",
    "card con templates": "card-template",
    "card y templates": "card-template",
    "card + templates": "card-template",
    "card más templates": "card-template",
    "card mas templates": "card-template",
    "template y card": "card-template",
    "template en card": "card-template",
    "template con card": "card-template",
    "template de card": "card-template",
    "template de la card": "card-template",
    "template + card": "card-template",
    "template más card": "card-template",
    "template mas card": "card-template",
    "templates y card": "card-template",
    "templates en card": "card-template",
    "templates con card": "card-template",
    "templates de card": "card-template",
    "templates de la card": "card-template",
    "templates + card": "card-template",
    "templates más card": "card-template",
    "templates mas card": "card-template",
    # card-theme
    "card y variables css": "card-theme",
    "card + variables css": "card-theme",
    "card mas variables css": "card-theme",
    "card más variables css": "card-theme",
    "variables css de card": "card-theme",
    "variables css de la card": "card-theme",
    "variables css y card": "card-theme",
    "variables css + card": "card-theme",
    "variables css mas card": "card-theme",
    "variables css más card": "card-theme",
    "variables css del componente card": "card-theme",
    "variables css y componente card": "card-theme",
    "variables css + componente card": "card-theme",
    "variables css mas componente card": "card-theme",
    "variables css más componente card": "card-theme",
    "card css variables": "card-theme",
    "card component css variables": "card-theme",
    "css variables card component": "card-theme",
}