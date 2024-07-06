export interface FooterNavContainer {
    title: string
    child: Array<FooterNavLinkItem>
}

export interface FooterNavLinkItem {
    title: string
    to?: string
    href?: string
}

