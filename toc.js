// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="languages/index.html"><strong aria-hidden="true">1.</strong> Languages</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="languages/bash.html"><strong aria-hidden="true">1.1.</strong> Bash</a></li><li class="chapter-item expanded "><a href="languages/python.html"><strong aria-hidden="true">1.2.</strong> Python</a></li><li class="chapter-item expanded "><a href="languages/regex.html"><strong aria-hidden="true">1.3.</strong> Regex</a></li></ol></li><li class="chapter-item expanded "><a href="virtualization/index.html"><strong aria-hidden="true">2.</strong> Virtualization</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="virtualization/qemu.html"><strong aria-hidden="true">2.1.</strong> QEMU</a></li><li class="chapter-item expanded "><a href="virtualization/docker.html"><strong aria-hidden="true">2.2.</strong> Docker</a></li><li class="chapter-item expanded "><a href="virtualization/podman.html"><strong aria-hidden="true">2.3.</strong> Podman</a></li></ol></li><li class="chapter-item expanded "><a href="tools/index.html"><strong aria-hidden="true">3.</strong> Tools(DevOps)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tools/ansible.html"><strong aria-hidden="true">3.1.</strong> Ansible</a></li><li class="chapter-item expanded "><a href="tools/neovim.html"><strong aria-hidden="true">3.2.</strong> Neovim</a></li><li class="chapter-item expanded "><a href="tools/jenkins.html"><strong aria-hidden="true">3.3.</strong> Jenkins</a></li><li class="chapter-item expanded "><a href="tools/ripgrep.html"><strong aria-hidden="true">3.4.</strong> ripgrep</a></li><li class="chapter-item expanded "><a href="tools/grep.html"><strong aria-hidden="true">3.5.</strong> grep</a></li></ol></li><li class="chapter-item expanded "><a href="cloud/index.html"><strong aria-hidden="true">4.</strong> Cloud</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="cloud/gcp.html"><strong aria-hidden="true">4.1.</strong> GCP</a></li><li class="chapter-item expanded "><a href="cloud/aws.html"><strong aria-hidden="true">4.2.</strong> AWS</a></li></ol></li><li class="chapter-item expanded "><a href="linux/index.html"><strong aria-hidden="true">5.</strong> Linux</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="linux/arch.html"><strong aria-hidden="true">5.1.</strong> Arch</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="linux/arch/pacman.html"><strong aria-hidden="true">5.1.1.</strong> pacman</a></li></ol></li><li class="chapter-item expanded "><a href="linux/alpine.html"><strong aria-hidden="true">5.2.</strong> Alpine</a></li></ol></li><li class="chapter-item expanded "><a href="suckless/index.html"><strong aria-hidden="true">6.</strong> Suckless</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="suckless/dwm.html"><strong aria-hidden="true">6.1.</strong> dwm</a></li><li class="chapter-item expanded "><a href="suckless/dmenu.html"><strong aria-hidden="true">6.2.</strong> dmenu</a></li><li class="chapter-item expanded "><a href="suckless/dwmblocks.html"><strong aria-hidden="true">6.3.</strong> dwmblocks</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
