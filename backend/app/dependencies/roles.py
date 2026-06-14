from fastapi import Depends
from fastapi import HTTPException

from app.dependencies.auth import get_current_user


# =========================================
# ADMIN
# =========================================

def require_admin(

    usuario = Depends(get_current_user)

):

    if usuario.rol_id != 1:

        raise HTTPException(
            status_code=403,
            detail="Acceso denegado"
        )

    return usuario


# =========================================
# VENDEDOR
# =========================================

def require_vendedor(

    usuario = Depends(get_current_user)

):

    if usuario.rol_id != 2:

        raise HTTPException(
            status_code=403,
            detail="Acceso denegado"
        )

    return usuario


# =========================================
# BODEGUERO
# =========================================

def require_bodeguero(

    usuario = Depends(get_current_user)

):

    if usuario.rol_id != 3:

        raise HTTPException(
            status_code=403,
            detail="Acceso denegado"
        )

    return usuario


# =========================================
# ADMIN O VENDEDOR
# =========================================

def require_admin_or_vendedor(

    usuario = Depends(get_current_user)

):

    if usuario.rol_id not in [1, 2]:

        raise HTTPException(

            status_code=403,

            detail="Acceso denegado"
        )

    return usuario


# =========================================
# ADMIN O BODEGUERO
# =========================================

def require_admin_or_bodeguero(

    usuario = Depends(get_current_user)

):

    if usuario.rol_id not in [1, 3]:

        raise HTTPException(

            status_code=403,

            detail="Acceso denegado"
        )

    return usuario